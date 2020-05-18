import {HealthCheckRating} from "../types";
import * as Yup from 'yup';

export const HealthCheckSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description required'),
  date: Yup.date()
    .required('Date required'),
  specialist: Yup.string()
    .required('Required'),
  healthCheckRating: Yup.string().oneOf(Object.keys(HealthCheckRating))
});

export const HospitalSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description required'),
  date: Yup.date()
    .required('Date required'),
  specialist: Yup.string()
    .required('Required'),
  discharge: Yup.object().shape(
    {
      date: Yup.date().required('Required date'),
      criteria: Yup.string().required('Criteria required'),
    })
});
