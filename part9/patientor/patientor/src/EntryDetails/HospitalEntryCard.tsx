import React from 'react';
import { Diagnosis, HospitalEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

interface Props {
  entry: HospitalEntry;
  diagnoses: { [code: string]: Diagnosis };
}

const HospitalEntryCard: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" />
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {entry.diagnosisCodes
          ? entry.diagnosisCodes.map((code: string) => (
            <div key={code}>{diagnoses[code]?.name}</div>
          ))
          : null}
      </Card.Content>
      <Card.Content>
        <div><strong>Discharge: </strong>{entry.discharge.date}</div>
        <div><strong>Reason: </strong>{entry.discharge.criteria}</div>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryCard;