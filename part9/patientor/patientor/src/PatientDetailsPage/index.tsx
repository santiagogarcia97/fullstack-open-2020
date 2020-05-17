import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Button, Grid, Header, Icon, Card} from 'semantic-ui-react';

import { useStateValue } from '../state/state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import {setPatientDetails} from '../state';
import EntryDetails from '../EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetails } = await axios
          .get<Patient>(`${apiBaseUrl}/patients/${id}`
          );
        dispatch(setPatientDetails(patientDetails));
      } catch (e) {
        console.error(e.message);
      }
    };
    if(!patientDetails[id])
      fetchPatientDetails();
  }, [dispatch, id]);

  if (patientDetails[id]) {
    const patient = patientDetails[id];
    return (
      <>
        <Header>
          <span>{patient.name}</span>
          <span>
            {patient.gender === 'female'
              ? <Icon name="venus" />
              : <Icon name="mars" />
            }
          </span>
        </Header>
        <p><strong>SSN: </strong>{patient.ssn}</p>
        <p><strong>Occupation: </strong>{patient.occupation}</p>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign={'middle'}><h3>Entries:</h3></Grid.Column>
            <Grid.Column>
              <Button primary floated={'right'} onClick={() => openModal()}>Add Entry</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Card.Group centered>
          {patient.entries?.map((entry, i) =>
            <EntryDetails key={i} entry={entry} />
          )}
        </Card.Group>

        <AddEntryModal modalOpen={modalOpen} onClose={closeModal} patientId={patient.id}/>
      </>
    );
  } else {
    return null;
  }
};

export default PatientDetailsPage;