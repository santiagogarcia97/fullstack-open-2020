import React from 'react';
import {Diagnosis, OccupationalHealthcareEntry} from '../types';
import { Card, Icon } from 'semantic-ui-react';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: { [code: string]: Diagnosis };
}

const OccupationalHealthcareEntryCard: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="plus square" />
        </Card.Header>
        <Card.Description><strong>Description: </strong>{entry.description}</Card.Description>
      </Card.Content>
      {entry.diagnosisCodes
        ? <Card.Content>
          <div><strong>Diagnosis</strong></div>
          {entry.diagnosisCodes.map((code: string) => (
            <div key={code}>{diagnoses[code]?.name}</div>
          ))}
        </Card.Content>
        : null}
      <Card.Content>
        <strong>Employer: </strong>
        {entry.employerName}
      </Card.Content>
      {entry.sickLeave ? (
        <Card.Content>
            Sick leave from
          <strong> {entry.sickLeave.startDate} </strong>
            to
          <strong> {entry.sickLeave.endDate} </strong>
        </Card.Content>
      ) : null}
    </Card>
  );
};

export default OccupationalHealthcareEntryCard;