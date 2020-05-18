import {HealthCheckRating} from "../types";
import {HealthcheckFormValues} from "./HealthcheckForm";

export const healthCheckValidations = (values: HealthcheckFormValues) => {
  const requiredError = 'Field is required';

  const errors: { [field: string]: string } = {};
  if (!values.description || values.description === '') {
    errors.description = requiredError;
  }
  if (isNaN(Date.parse(values.date))) {
    errors.date = 'Invalid date';
  }
  if (!values.date || values.date === '') {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!(values.healthCheckRating in HealthCheckRating)) {
    errors.healthCheckRating = 'Invalid value';
  }
  return errors;
};