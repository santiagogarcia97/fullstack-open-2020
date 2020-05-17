import React from 'react';
import { HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

type HeartColors = 'green' | 'yellow' | 'orange' | 'red' | undefined;

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryCard: React.FC<Props> = ({ entry }) => {
  let color: HeartColors;

  switch (entry.healthCheckRating) {
  case 0:
    color = 'green';
    break;
  case 1:
    color = 'yellow';
    break;
  case 2:
    color = 'orange';
    break;
  case 3:
    color = 'red';
    break;
  default:
    color = undefined;
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor" />
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="heart" color={color} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryCard;