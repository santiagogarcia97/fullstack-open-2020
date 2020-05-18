import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import {Field, Formik, Form} from 'formik';

import {TextField, NumberField, DiagnosisSelection} from './FormField';
import { HealthCheckEntry, HealthCheckRating} from '../types';
import {useStateValue} from '../state';
import {HealthCheckSchema} from './formValidations';

export type HealthcheckFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: HealthcheckFormValues) => void;
  onCancel: () => void;
}

export const HealthCheckForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validationSchema={HealthCheckSchema}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched}) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label='HealthCheckRating'
              min='0'
              max='3'
              name='healthCheckRating'
              component={NumberField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoses}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckForm;