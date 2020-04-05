import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (args) => {
    return (
        <h1>{args.course}</h1>
    )
}

const Content = (args) => {
    return (
        <>
            <Part part={args.parts[0]} />
            <Part part={args.parts[1]} />
            <Part part={args.parts[2]} />
        </>
    )
}

const Part = (args) => {
    return (
        <p>{args.part.name} {args.part.exercises}</p>
    )
}

const Total = (args) => {
    return (
        <p>Number of exercises {args.parts[0].exercises + args.parts[1].exercises + args.parts[2].exercises}</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
