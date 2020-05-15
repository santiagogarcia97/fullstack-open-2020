import express from 'express';
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/patientValidation";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  const patient = patientService.findById(id)

  if(patient){
    res.send(patient);
  } else {
    res.status(404).send({error: 'no patient found'})
  }

});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;