import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import {setDiagnosisList, setPatientList, useStateValue} from './state';
import {Diagnosis, Patient} from './types';

import PatientListPage from './PatientListPage';
import PatientDetailsPage from './PatientDetailsPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisList));
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetailsPage  />}/>
            <Route path="/" render={() => <PatientListPage />}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
