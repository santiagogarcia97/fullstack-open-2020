import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

const Course = ({course}) => {
    return(
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </>
    )
}

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
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

// const Total = (args) => {
//     return (
//         <p>Number of exercises {args.parts[0].exercises + args.parts[1].exercises + args.parts[2].exercises}</p>
//     )
// }

ReactDOM.render(<App />, document.getElementById('root'))
