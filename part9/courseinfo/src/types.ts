
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartWithDesc extends CoursePartBase{
  description: string;
}

export interface CoursePartOne extends CoursePartWithDesc {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartWithDesc {
  name: "Redux";
  resourcesLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;