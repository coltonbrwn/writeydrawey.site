
const formatTime = seconds => {
  if (seconds === null) {
    return ''
  }
  let m = Math.floor(seconds / 60)
  let s = (seconds < 1) ? seconds : seconds
  s = Math.abs(s % 60)
  s = s < 10 ? `0${ s }` : s
  return `${ m }:${ s }`
}

export default class TurnTimer extends React.Component {

  constructor({ timer, defaultTime }) {
    super();
    this.state = {
      seconds: this.getSeconds(timer, defaultTime)
    }
  }

  getSeconds = ( timer, defaultTime ) => {
    if (!timer) {
      return defaultTime
    }
    const now = new Date().getTime()
    return Math.floor( (timer.end - now) / 1000 )
  }

  componentDidMount = () => {
    this.interval = window.setInterval( () => {
      if (!this.state.seconds) {
        return window.clearInterval(this.interval)
      }
      this.setState({
        seconds: this.getSeconds(this.props.timer, this.props.defaultTime)
      })
    }, 500)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <span className="mono">
        { formatTime(this.state.seconds) }
      </span>
    )
  }

}
