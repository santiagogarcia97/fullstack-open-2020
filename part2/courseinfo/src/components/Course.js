import React from 'react'

const Course = ({course}) => {
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({parts}) => {
//    console.log(parts)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({part}) => {
//    console.log(part)
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({parts}) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <h3>
            <p>Number of exercises {total}</p>
        </h3>
    )
}

export default Course