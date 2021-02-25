import Oval1 from '../svg/oval-1'
import Oval2 from '../svg/oval-2'

export default class Button extends React.Component {
  render() {

    const Oval = [
      null,
      Oval1,
      Oval2
    ][ this.props.type || 1]

    return (
      <button { ...this.props }>
        <span className="button__text">
          { this.props.children }
        </span>
        <Oval />
      </button>
    )
  }
}
