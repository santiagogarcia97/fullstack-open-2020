import diagnosesRaw from '../data/diagnoses';
import {DiagnoseEntry} from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnosesRaw;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};