import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = parseInt(req.query.height);
    const weight = parseInt(req.query.weight);

    if(isNaN(height) || isNaN(weight))
      throw new Error('bad req');
    const bmi = calculateBmi(height, weight);

    res.send({height, weight, bmi});
  } catch (e) {
    res.send('malformatted parameters');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});