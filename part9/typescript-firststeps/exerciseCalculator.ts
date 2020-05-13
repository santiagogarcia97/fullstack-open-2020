type Rating = 1 | 2 | 3

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: Rating,
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))