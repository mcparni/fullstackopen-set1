import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  const { text, handleClick, current, category } = props
  return (
    <button onClick={handleClick(current, category)}>{text}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.MAX = props.anecdotes.length - 1
    this.getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    this.state = {
      selected: this.getRandomInteger(0,this.MAX),
      voted : [0, 0, 0, 0, 0, 0]
    }
    
  }

  render() {

    const clickHandler = (current, category) => () => {
      if(category === 'next') {
        this.setState({ selected:  this.getRandomInteger(0,this.MAX) })
      } else {
        let tempVoted = [...this.state.voted]
        tempVoted[current] += 1
        this.setState({ voted: tempVoted}) 
      }
    }
    
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>Has {this.state.voted[this.state.selected]} votes</p>
        <Button category="vote" current={this.state.selected} handleClick={clickHandler} text="Vote this!" />
        <Button category="next" current={this.state.selected} handleClick={clickHandler} text="Next anecdote" />
      </div>
    )
  }
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