import patientsRaw from '../data/patients';
import { v4 as uuidv4 } from 'uuid'
import {PatientEntry, NonSensitiveDiaryEntry, NewPatientEntry} from "../types";

const patients: PatientEntry [] = patientsRaw;

const getEntries = (): PatientEntry [] => {
  return patients;
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find(p => p.id === id);
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

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  findById,
  getNonSensitiveEntries,
  addEntry
};