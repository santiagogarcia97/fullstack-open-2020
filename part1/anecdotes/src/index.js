import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    let i = votes.indexOf(Math.max(...votes));

    const handleNextClick = () => {
        setSelected(Math.round(Math.random() * (anecdotes.length - 1)))
    }

    const handleVoteClick = () => {
        let copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={handleVoteClick}>vote</button>
            <button onClick={handleNextClick}>next</button>

            <h1>Anecdote most voted</h1>
            <p>{props.anecdotes[i]}</p>
            <p>has {votes[i]} votes</p>
        </div>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)