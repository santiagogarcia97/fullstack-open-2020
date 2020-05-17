import {Entry, Gender, NewPatientEntry} from '../types';
import * as guards from './typesGuards';

const parseString = (text: any): string => {
  if (!text || !guards.isString(text)) {
    throw new Error('Incorrect or missing field: ' + text);
  }
  return text;
};

const parseDate = (date: any): string => {
  if (!date || !guards.isString(date) || !guards.isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !guards.isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: Array<any>): Array<Entry> => {
  if (entries) {
    entries.forEach((entry: Entry) => {
      if (!guards.isEntryValid(entry)) {
        throw new Error('Incorrect entry type: ' + entry);
      }
    });
    return entries;
  } else {
    return Array<Entry>();
  }
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };
};

export default toNewPatientEntry;