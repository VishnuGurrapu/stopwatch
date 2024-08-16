import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
      isActive: false,
    }
    this.interval = null
  }

  componentDidMount() {
    // Set up the interval, but don't start the timer until the user clicks "Start"
    this.interval = setInterval(() => {
      if (this.state.isActive) {
        this.setState(prevState => ({
          seconds: prevState.seconds + 1,
        }))
      }
    }, 1000)
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts to avoid memory leaks
    clearInterval(this.interval)
  }

  startTimer = () => {
    this.setState({isActive: true})
  }

  stopTimer = () => {
    this.setState({isActive: false})
  }

  reset = () => {
    this.stopTimer()
    this.setState({
      seconds: 0,
    })
  }

  formatTime = secs => {
    const minutes = Math.floor(secs / 60)
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(secs % 60).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {seconds, isActive} = this.state
    return (
      <div className="appContainer">
        <h1 className="heading">Stopwatch</h1>
        <div className="contentContainer">
          <div className="timerContainer">
            <div className="timeiconContainer">
              <img
                className="icon"
                alt="stopwatch"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              />
              <p className="timerinWords">Timer</p>
            </div>
            <h1 className="timer">{this.formatTime(seconds)}</h1>
            <div className="btnContainer">
              <button
                onClick={this.startTimer}
                className="startButton btn"
                disabled={isActive}
              >
                Start
              </button>
              <button
                onClick={this.stopTimer}
                className="stopButton btn"
                disabled={!isActive}
              >
                Stop
              </button>
              <button onClick={this.reset} className="resetButton btn">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
