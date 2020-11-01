
const formatTime = seconds => {
  let s = seconds < 1 ? 0 : seconds
  s = Math.abs(s % 60)
  s = s < 10 ? `0${ s }` : s
  return `${ Math.floor(s / 60)}:${ s }`
}

export default class TurnTimer extends React.Component {

  constructor({ countTo }) {
    super();
    this.state = {
      seconds: this.getSeconds({ countTo })
    }
  }

  getSeconds = ({ countTo }) => {
    const now = new Date().getTime()
    return Math.floor( (countTo - now) / 1000 );
  }

  componentDidMount = () => {
    this.interval = window.setInterval( () => {
      this.setState({
        seconds: this.getSeconds({ countTo: this.props.countTo })
      })
    }, 500)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <span className="mono">
        { formatTime(this.state.seconds) }
      </span>
    )
  }

}
