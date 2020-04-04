
export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const myId = this.props.player.id;
    console.log(this.props.gameState)
    return (
      <div>
        <h3>{ this.props.gameState.round }</h3>
        {
          this.props.gameState.round % 2
            ? (
              <div>
                <h1>Draw "Cool Guys"</h1>
                <iframe id="drawingCanvas" src="/canvas/index.html" />
                <button className="large">
                  Okay
                </button>
              </div>
            ): (
              <div>

              </div>
            )
        }

      </div>

    )
  }
}
