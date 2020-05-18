import {HealthCheckRating} from '../types';
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
    .required('Specialist required'),
  discharge: Yup.object().shape(
    {
      date: Yup.date().required('Required date'),
      criteria: Yup.string().required('Criteria required'),
    })
});

export const OccupationalHealthcareSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description required'),
  date: Yup.date()
    .required('Date required'),
  specialist: Yup.string()
    .required('Specialist required'),
  employerName: Yup.string()
    .required('Employer required'),
  sickLeave: Yup.object().shape(
    {
      startDate: Yup.date().required('Required date'),
      endDate: Yup.date().required('Required date')
    })
});