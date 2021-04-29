import Oval1 from '../svg/oval-1'
import Oval2 from '../svg/oval-2'

export default class Button extends React.Component {

  constructor() {
    super()
    this.state={
      showTooltip: false
    }
  }

  onMouseEnter = () => {
    if (this.timeout) {
      return
    }
    this.timeout = window.setTimeout( () => {
      this.setState({
        showTooltip: true
      })
    }, 300)
  }

  onMouseLeave = () => {
    window.clearInterval(this.timeout)
    this.setState({
      showTooltip: false
    })
    this.timeout = null
  }

  render() {

    const Oval = [
      null,
      Oval1,
      Oval2
    ][ this.props.type || 1]

    return (
      <div
        className={ this.props.className }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
      >
        <button { ...this.props }>
          <span className="button__text">
            { this.props.children }
          </span>
          <Oval />
          {
            this.props.tooltip && (
              <div className="tooltip" hidden={ !this.state.showTooltip }>
                { this.props.tooltip }
              </div>
            )
          }
        </button>
      </div>
    )
  }
}
