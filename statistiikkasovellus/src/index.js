import React from 'react'
import ReactDOM from 'react-dom'

const H1 = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}
const H2 = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral:0,
      bad: 0
    }
    

  }
  render() {
    const feedback = (category) => () => { 
      this.setState({ [category]: this.state[category]+1 })
    }
    const headings = {
      h1: 'Anna palautetta',
      h2: 'Statistiikka'
    }
    return (
      
      <div>
        <H1 text={headings.h1} />
        <button category="good" onClick={feedback('good')}>Hyvä</button>
        <button category="neutral" onClick={feedback('neutral')}>Neutraali</button>
        <button category="bad" onClick={feedback('bad')}>Huono</button>
        <H2 text={headings.h2} />
        <div>Hyvä: {this.state.good}</div>
        <div>Neutraali: {this.state.neutral}</div>
        <div>Huono: {this.state.bad}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)