import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import HospitalEntryCard from './HospitalEntryCard';
import HealthCheckEntryCard from './HealthCheckEntryCard';
import OccupationalHealthcareEntryCard from './OccupationalHealthcareEntryCard';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  switch (entry.type) {
  case 'Hospital':
    return <HospitalEntryCard entry={entry} diagnoses={diagnoses} />;
  case 'HealthCheck':
    return <HealthCheckEntryCard entry={entry} />;
  case 'OccupationalHealthcare':
    return (
      <OccupationalHealthcareEntryCard entry={entry} diagnoses={diagnoses} />
    );
  default:
    return assertNever(entry);
  }
};

export default EntryDetails;