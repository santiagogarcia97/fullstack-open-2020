import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1);
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    }
    const handleBadClick = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <h1>Give feedback</h1>

            <Button handleClick={handleGoodClick} text={'Good'}/>
            <Button handleClick={handleNeutralClick} text={'Neutral'}/>
            <Button handleClick={handleBadClick} text={'Bad'}/>

            <Statistics good={good} neutral={neutral} bad={bad}/>

        </div>
    )
}

const Button = ({handleClick, text}) => {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistics = ({good, neutral, bad}) => {
    let all = good + neutral + bad;
    //console.log(good, neutral, bad);

    if(all !== 0) {
        return (
            <div>
                <h1>Stats</h1>

                <table>
                    <tbody>
                    <Statistic text={'good:'} value={good}/>
                    <Statistic text={'neutral:'} value={neutral}/>
                    <Statistic text={'bad:'} value={bad}/>
                    <Statistic text={'all:'} value={all}/>
                    <Statistic text={'avg:'} value={(good - bad)/all}/>
                    <Statistic text={'positive(%):'} value={(good/all)*100}/>
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Stats</h1>
                <p>No feedback given</p>
            </div>
        )
    }
}

const Statistic = ({text, value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)