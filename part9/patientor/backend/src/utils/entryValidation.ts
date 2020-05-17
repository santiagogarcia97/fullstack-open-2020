import {BaseEntry, HealthCheckEntry, HospitalEntry,
  OccupationalHealthcareEntry, Entry, Diagnosis,} from '../types';
import * as guards from './typesGuards';
import { v4 as uuid } from 'uuid';
import diagnoseEntries from '../data/diagnoses';

const parseDate = (date: any): string => {
  if (!date || !guards.isString(date) || !guards.isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseString = (text: any): string => {
  if (!text || !guards.isString(text)) {
    throw new Error('Incorrect or missing field: ' + text);
  }
  return text;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (diagnosisCodes) {
    diagnosisCodes.forEach((code: any) => {
      if (!code || !guards.isString(code) || !diagnoseEntries.map((d) => d.code).includes(code)
      ) {
        throw new Error(`Incorrect diagnosis code: ${code}`);
      }
    });
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (rating: any): number => {
  if (rating === undefined || !guards.isNumber(rating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${rating}`);
  }
  return rating;
};

export const toNewEntry = (newEntry: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseString(newEntry.description),
    date: parseDate(newEntry.date),
    specialist: parseString(newEntry.specialist),
    diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes) || undefined,
  };

  const type = parseString(newEntry.type);
  let entry: Entry;

  switch (type) {
  case 'HealthCheck': {
    entry = {
      ...baseEntry,
      type,
      healthCheckRating: parseHealthCheckRating(
        newEntry.healthCheckRating
      ),
    } as HealthCheckEntry;
    break;
  }
  case 'Hospital': {
    entry = {
      ...baseEntry,
      type,
      discharge: {
        date: parseDate(newEntry.discharge.date),
        criteria: parseString(newEntry.discharge.criteria),
      },
    } as HospitalEntry;
    break;
  }
  case 'OccupationalHealthcare': {
    entry = {
      ...baseEntry,
      type,
      employerName: parseString(newEntry.employerName),
      sickLeave: newEntry.sickLeave ?
        {
          startDate: parseDate(newEntry.sickLeave.startDate),
          endDate: parseDate(newEntry.sickLeave.endDate),
        } : undefined,
    } as OccupationalHealthcareEntry;
  }
    break;
  }

  // @ts-ignore
  return entry;
};
