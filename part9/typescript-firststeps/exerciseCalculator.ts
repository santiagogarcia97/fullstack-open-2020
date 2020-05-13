type Rating = 1 | 2 | 3

interface excerciseData {
  target: Rating
  hoursPerDay: Array<number>
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: Rating,
  average: number
}

const parseArguments = (args: Array<string>): excerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments')

  try {
    const target = parseInt(args[2]) as Rating
    const hoursPerDay = args.slice(3).map(hour => parseFloat(hour))

    return {target, hoursPerDay}
  } catch (e) {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateExercises = (hoursPerDay: Array<number>, target: Rating) : Result => {

  const calculateRating = (avg: number) : Rating => {
    if (avg < 1.5)
      return 1
    if (avg >= 1.5 && avg < 2)
      return 2
    if (avg >= 2)
      return 3
  }

  const getDescription = (rating: Rating): string => {
    switch (rating) {
      case 1:
        return 'Bad'
      case 2:
        return 'not too bad but could be better'
      case 3:
        return 'Good'
      default:
        return 'Wrong Rating'
    }
  }
  const periodLength = hoursPerDay.length

  const trainingDays = hoursPerDay.filter(hours => hours !== 0).length

  const average = hoursPerDay.reduce(
    (count, hour) => count + hour)/ periodLength

  const rating = calculateRating(average)

  const ratingDescription = getDescription(rating)

  let result: Result = {
    periodLength,
    trainingDays,
    target,
    average,
    rating,
    ratingDescription,
    success: (rating >= target),
  }

  return result
}

try {
  const { target, hoursPerDay } = parseArguments(process.argv)
  console.log(calculateExercises(hoursPerDay, target))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}