import patientsRaw from '../data/patients';
import { v4 as uuidv4 } from 'uuid'
import {PatientEntry, NonSensitiveDiaryEntry, newPatientEntry} from "../types";

const patients: PatientEntry [] = patientsRaw;

const getEntries = (): PatientEntry [] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
  return patientsRaw.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = ( entry: newPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};