import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientValidation';
import {toNewEntry} from '../utils/entryValidation';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findById(id);

  if(patient){
    res.send(patient);
  } else {
    res.status(404).send({error: 'no patient found'});
  }

});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id;
    const newEntry = toNewEntry(req.body);

    const updatedPatient = patientService.addEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;