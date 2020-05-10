import * as api from '../lib/api';
import Nav from './nav';

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      description: '',
      startedDrawing: false,
      time: 590
    }
  }

  componentDidMount() {
    const isDrawingRound = Boolean(this.props.gameState.round % 2)
    if (!isDrawingRound) {
      this.countdown()
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  getLeftHandPlayer() {
    const { gameState, viewer } = this.props
    const myPlayerIndex = gameState.players.findIndex( p => p.playerId === viewer.userId )
    const leftHandPlayerIndex = myPlayerIndex === 0
      ? gameState.players.length - 1
      : myPlayerIndex - 1
    const leftHandPlayerId = gameState.players[ leftHandPlayerIndex ].playerId
    const leftHandPlayerInput = gameState.playerInput.find( input => (
      input.round === gameState.round - 1 && input.playerId === leftHandPlayerId
    ))
    return leftHandPlayerInput || {}
  }

  countdown = () => {
    this.interval = window.setInterval(() => {
      this.setState({
        time: this.state.time - 1
      })
      if (this.state.time <= 1) {
        window.clearInterval(this.interval)
        return this.onDrawingSubmit()
      }
    }, 1000)
  }

  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    })
  }

  onStartDrawingClick = () => {
    this.countdown();
    this.setState({
      startedDrawing: true
    })
  }

  onPhraseSubmit = async () => {
    try {
      await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        phrase: this.state.description
      })
    } catch (e) {
      console.log(e)
    }
  }

  onDrawingSubmit = async () => {
    try {
      const dataUrl = document
        .getElementById('drawingCanvas')
        .contentWindow.document
        .getElementById('myCanvas')
        .toDataURL("image/png");
      await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        drawing: dataUrl
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    if (!(this.props.viewer && this.props.gameState.players.find( p => p.playerId === this.props.viewer.userId ))) {
      return (
        <div>
          <h1>This game is currently being played</h1>
          <a href="/">
            <button className="large">
              Go Home
            </button>
          </a>
        </div>
      )
    }

    const myId = this.props.viewer.userId
    const isDrawingRound = Boolean(this.props.gameState.round % 2)
    const leftHandPlayerInput = this.getLeftHandPlayer()
    const startedDrawing = this.state.startedDrawing
    const textOverride = (isDrawingRound && !startedDrawing)
      ? `round ${ this.props.gameState.round }`
      : `:${ this.state.time } `;
    return (
      <div className="playing full-height">
        <Nav textOverride={ textOverride }/>
        {
          isDrawingRound
            ? (
                startedDrawing ? (
                  <div className="flex-container">
                    <iframe id="drawingCanvas" src="/canvas/index.html" />
                    <div className="bottom-margin">
                      <h2>
                        "{ leftHandPlayerInput.phrase }"
                      </h2>
                      <button onClick={ this.onDrawingSubmit }>
                        <span>Done</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-container">
                    <h1>Draw "{ leftHandPlayerInput.phrase }"</h1>
                    <button onClick={ this.onStartDrawingClick }>
                      Start
                    </button>
                  </div>
                )
            ) : (
              <div className="content-container flex-container">
                <img className="playerDrawing" src={ leftHandPlayerInput.drawing } />
                <div className="bottom-margin">
                  <h4>
                    describe this:
                  </h4>
                  <span className="input-wrapper">
                    <input
                      onChange={ this.onDescriptionChange }
                      value={ this.state.description }
                    />
                  </span>
                  <button onClick={ this.onPhraseSubmit }>
                    Okay
                  </button>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}
