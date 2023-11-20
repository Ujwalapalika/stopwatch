import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    TimeElapsedSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  updateTime = () => {
    this.setState(prevState => ({
      TimeElapsedSeconds: prevState.TimeElapsedSeconds + 1,
    }))
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false, TimeElapsedSeconds: 0})
  }

  onStartTimer = () => {
    this.timeInterval = setInterval(this.updateTime, 1000)
    this.setState({isTimerRunning: true})
  }

  renderSeconds = () => {
    const {TimeElapsedSeconds} = this.state
    const seconds = Math.floor(TimeElapsedSeconds % 60)
    if (seconds < 9) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {TimeElapsedSeconds} = this.state
    const minutes = Math.floor(TimeElapsedSeconds / 60)
    if (minutes < 9) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const RunningTimer = `${this.renderMinutes()} : ${this.renderSeconds()}`
    return (
      <div className="timerbg">
        <h1>Stopwatch</h1>
        <div className="timerArr">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="stopwatch"
          />
          <h1>Timer</h1>
        </div>
        <div>
          <p>{RunningTimer}</p>
          <div className="buttonsorg">
            <button
              type="button"
              onClick={this.onStartTimer}
              disabled={isTimerRunning}
            >
              Start
            </button>
            <button type="button" onClick={this.onStopTimer}>
              Stop
            </button>
            <button type="button" onClick={this.onResetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
