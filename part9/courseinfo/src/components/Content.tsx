import React from "react";

interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Array<Part>;
}

const Content: React.FC<ContentProps> = (props) => {
  return(
    <div>
      {props.parts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)}
    </div>
  )
}

export default Content