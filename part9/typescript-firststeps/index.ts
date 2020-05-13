import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';
import {calculateExercises, Rating, ExcerciseData} from "./exerciseCalculator";


app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    const hoursPerDay = req.body.dailyExercises;
    const target = req.body.target;

    if(!hoursPerDay || !target)
      throw new Error('missing parameters');

    if(isNaN(target))
      throw new Error('target is wrong type');

    hoursPerDay.forEach(
      (hour) => {
        if(isNaN(hour))
          throw new Error('hoursPerDay is wrong type');
      });

    const data = {
      hoursPerDay: req.body.dailyExercises,
      target: parseInt(req.body.target) as Rating
    } as ExcerciseData;
    return  res.send(calculateExercises(data));

  } catch (e) {
    return res.status(400).send({error: e.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});