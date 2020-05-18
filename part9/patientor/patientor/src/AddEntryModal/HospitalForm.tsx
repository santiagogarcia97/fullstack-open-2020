import React from 'react';
import { Grid, Button, FormGroup } from 'semantic-ui-react';
import {Field, Formik, Form} from 'formik';

import {TextField, DiagnosisSelection} from './FormField';
import {HospitalEntry} from '../types';
import {useStateValue} from '../state';
import {HospitalSchema} from './formValidations'

export type HospitalFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

export const HospitalForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validationSchema={HospitalSchema}
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
            <p><strong>Discharge:</strong></p>
            <FormGroup widths='equal'>
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </FormGroup>
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

export default HospitalForm;