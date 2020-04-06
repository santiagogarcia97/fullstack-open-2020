import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    let all = good + neutral + bad;

    console.log(good, neutral, bad);

    if(all !== 0) {
        return (
            <>
                <h1>Stats</h1>
                <p>good: {good}</p>
                <p>neutral: {neutral}</p>
                <p>bad: {bad}</p>
                <p>all: {all}</p>
                <p>avg: {(good - bad)/all}</p>
                <p>positive: {(good/all)*100}%</p>
            </>
        )
    }
    else {
        return (
            <>
                <h1>Stats</h1>
                <p>No feedback given</p>
            </>
        )
    }
}

ReactDOM.render(<App />,
    document.getElementById('root')
)