import {Entry, Gender} from '../types';

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (param: any): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const isEntryValid = (param: any): param is Entry => {
  return (param.type &&
    (param.type === 'HealthCheck') ||
    (param.type === 'OccupationalHealthcare') ||
    (param.type === 'Hospital')
  );
};