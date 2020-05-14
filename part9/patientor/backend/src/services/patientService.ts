import patientsRaw from '../data/patients'
import {PatientEntry} from "../types";

const patients: PatientEntry [] = patientsRaw;

const getEntries = (): PatientEntry [] => {
  return patients;
};

const getNonSensitiveEntries = (): PatientEntry [] => {
  return patientsRaw.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};