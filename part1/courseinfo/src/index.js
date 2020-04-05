import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={part1}
                     part2={part2}
                     part3={part3}
            />
            <Total  ex1={part1.exercises}
                    ex2={part2.exercises}
                    ex3={part3.exercises}
            />
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
            <Part part={args.part1} />
            <Part part={args.part2} />
            <Part part={args.part3} />
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
        <p>Number of exercises {args.ex1 + args.ex2 + args.ex3}</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
