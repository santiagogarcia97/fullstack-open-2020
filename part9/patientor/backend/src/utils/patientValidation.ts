import {Entry, Gender, NewPatientEntry} from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntryValid = (param: any): param is Entry => {
  return (param.type &&
    (param.type === 'HealthCheck') ||
    (param.type === 'OccupationalHealthcare') ||
    (param.type === 'Hospital')
  );
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field: ' + text);
  }

  return text;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: Array<any>): Array<Entry> => {
  entries.forEach((entry: Entry) => {
    if (!isEntryValid(entry)) {
      throw new Error('Incorrect entry type: ' + entry);
    }
  });
  return entries;
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