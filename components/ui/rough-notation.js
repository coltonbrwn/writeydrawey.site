import { annotate } from 'rough-notation';

export default class RoughNotation extends React.Component {

  constructor() {
    super()
    this.ref = React.createRef()
  }

  componentDidMount() {
    if (this.props.toggle) {
      const annotation = annotate(this.ref.current, { type: this.props.style });
      annotation.show()
    }
  }

  render() {
    return (
      <span style={{ position: 'relative' }}>
        <span ref={ this.ref }>
          { this.props.children }
        </span>
      </span>
    )
  }
}
