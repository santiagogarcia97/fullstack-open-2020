import diagnosesRaw from '../data/diagnoses';
import {Diagnosis} from '../types';

const diagnoses: Array<Diagnosis> = diagnosesRaw;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};