import React from "react";
import {CoursePart} from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({part}) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name} {part.exerciseCount}<br/>
          Description: {part.description}
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          {part.name} {part.exerciseCount}<br/>
          Description: {part.description}<br/>
          Exercise submission link: {part.exerciseSubmissionLink}
        </p>
      )
    case "Using props to pass data":
      return (
        <p>
          {part.name} {part.exerciseCount}<br/>
          Group project count: {part.groupProjectCount}
        </p>
      )
    case "Redux":
      return (
        <p>
          {part.name} {part.exerciseCount}<br/>
          Description: {part.description}<br/>
          Resources link: {part.resourcesLink}
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part