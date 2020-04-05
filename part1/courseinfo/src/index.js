import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content part1={part1}
                     ex1={exercises1}
                     part2={part2}
                     ex2={exercises2}
                     part3={part3}
                     ex3={exercises3}
            />
            <Total  ex1={exercises1}
                    ex2={exercises2}
                    ex3={exercises3}
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
            <Part part={args.part1} ex={args.ex1}/>
            <Part part={args.part2} ex={args.ex2}/>
            <Part part={args.part3} ex={args.ex3}/>
        </>
    )
}

const Part = (args) => {
    return (
        <p>{args.part} {args.ex}</p>
    )
}

const Total = (args) => {
    return (
        <p>Number of exercises {args.ex1 + args.ex2 + args.ex3}</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
