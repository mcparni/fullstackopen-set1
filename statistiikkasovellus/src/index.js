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

const Statistic = (props) => {
  const {text,data} = props
  return (
    <div>{text}: {data}</div>
  )
}

const Statistics = (props) => {
  const { 
    texts, 
    state,
    avg,
    positives 
  } = props
  return (
    <div>
      <Statistic text={texts[0]} data={state.good} />
      <Statistic text={texts[1]} data={state.neutral} />
      <Statistic text={texts[2]} data={state.bad} />
      <Statistic text={texts[3]} data={avg} />
      <Statistic text={texts[4]} data={positives} />
    </div>
  )
}

const Button = (props) => {
  const { text, handleClick, category } = props
  return (
    <button onClick={handleClick(category)}>{text}</button>
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
    const positiveFeedback = () => {
      let all = this.state.good + this.state.neutral + this.state.bad
      let percentage = this.state.good / all * 100
      return isNaN(percentage) ? 0+'%': percentage.toFixed(1)+'%'
    }
    const average = () => {
      let all = this.state.good + this.state.neutral + this.state.bad
      let sum = this.state.good + this.state.bad * -1
      let avg = sum / all
      return isNaN(avg) ? 0.0: avg.toFixed(1)
    }
    const headings = {
      h1: 'Anna palautetta',
      h2: 'Statistiikka'
    }
    const texts = [
      "Hyvä",
      "Neutraali",
      "Huono",
      "Keskiarvo",
      "Positiivisia"
    ]
    const categories = [
      "good",
      "neutral",
      "bad"
    ]
    const noStats = this.state.good === 0 && this.state.neutral === 0 && this.state.bad === 0 ? true : false
    return (
      
      <div>
        <H1 text={headings.h1} />
        <Button category={categories[0]} handleClick={feedback} text={texts[0]} />
        <Button category={categories[1]} handleClick={feedback} text={texts[1]} />
        <Button category={categories[2]} handleClick={feedback} text={texts[2]} />
        <H2 text={headings.h2} />
        {noStats ? (
          <p>Ei vielä yhtään palautetta annettu.</p>
        ) : (
          <Statistics texts={texts} state={this.state} avg={average()} positives={positiveFeedback()} />
        )}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)