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
        <div>
            <h1>{args.course}</h1>
        </div>
    )
}

const Content = (args) => {
    return (
        <div>
             <p>
                 {args.part1} {args.ex1}
             </p>
             <p>
                 {args.part2} {args.ex2}
             </p>
             <p>
                 {args.part3} {args.ex3}
             </p>
        </div>
    )
}

const Total = (args) => {
    return (
        <div>
            <p>Number of exercises {args.ex1 + args.ex2 + args.ex3}</p>
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))
