import onetime from 'onetime'

export default class DrawingCanvas extends React.Component {

    componentDidMount() {
      window.addEventListener('drawing-in-progress', onetime(this.eventListener))
    }

    componentWillUnmount() {
      window.removeEventListener('drawing-in-progress', this.eventListener)
    }

    eventListener = (e) => {
      if (this.props.onInteractionStart) {
        console.log('hi')
        this.props.onInteractionStart()
      }
    }

    render() {
      return (
        <iframe
            id="drawingCanvas"
            src="/canvas/index.html"
        />
      )
    }
  }
  