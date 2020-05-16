import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import { useStateValue } from '../state/state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import {setPatientDetails} from '../state';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();

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
        <div><strong>ssn: </strong>{patient.ssn}</div>
        <div><strong>occupation: </strong>{patient.occupation}</div>
      </>
    );
  } else {
    return null;
  }
};

export default PatientDetailsPage;