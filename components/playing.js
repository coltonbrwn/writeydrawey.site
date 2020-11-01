import * as api from '../lib/api'
import GameNav from './game-nav'
import TurnTimer from './turn-timer'
import Button from './button'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      description: '',
      startedDrawing: false
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(props, state) {
    const currentRound = props.gameState.rounds.find( item => item.num === props.gameState.round );
    if (new Date().getTime() > currentRound.end) {
      const isDrawingRound = Boolean(this.props.gameState.round % 2)
      if (isDrawingRound) {
        this.onDrawingSubmit()
      } else {
        this.onPhraseSubmit()
      }
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

  onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    })
  }

  onStartDrawingClick = () => {
    this.setState({
      startedDrawing: true
    })
  }

  onPhraseSubmit = async () => {
    try {
      const { data: { response: newGameState } } = await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        phrase: this.state.description
      })
      if (this.props.onUpdateState) {
        this.props.onUpdateState(newGameState)
      }
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
      const { data: { response: newGameState } } = await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        drawing: dataUrl
      })

      if (this.props.onUpdateState) {
        this.props.onUpdateState(newGameState)
      }

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
            <Button type="2">
              Go Home
            </Button>
          </a>
        </div>
      )
    }

    const currentRound = this.props.gameState.rounds.find( item => item.num === this.props.gameState.round );
    if (new Date().getTime() < currentRound.start) {
      return (
        <div>
          <h2>
            Next round starting!
          </h2>
          <h1>
            <TurnTimer gameState={ this.props.gameState } countTo={ currentRound.start } />
          </h1>
        </div>
      )
    }

    const myId = this.props.viewer.userId
    const isDrawingRound = Boolean(this.props.gameState.round % 2)
    const leftHandPlayerInput = this.getLeftHandPlayer()
    const startedDrawing = this.state.startedDrawing
    return (
      <div className="playing full-height">
        <GameNav gameState={ this.props.gameState } />
        {
          isDrawingRound
            ? (
                startedDrawing ? (
                  <div className="flex-container">
                    <iframe
                      id="drawingCanvas"
                      src="/canvas/index.html" />
                    <div className="bottom-margin">
                      <h3>
                        "{ leftHandPlayerInput.phrase }"
                      </h3>
                      <Button onClick={ this.onDrawingSubmit } type="4">
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-container">
                    <h1>Draw "{ leftHandPlayerInput.phrase }"</h1>
                    <Button onClick={ this.onStartDrawingClick }>
                      Start
                    </Button>
                  </div>
                )
            ) : (
              <div className="flex-container">
                <img
                  className="playerDrawing"
                  src={ leftHandPlayerInput.drawing } />
                <div className="bottom-margin">
                  <span className="input-wrapper">
                    <h3>
                      describe this:
                    </h3>
                    <input
                      onChange={ this.onDescriptionChange }
                      value={ this.state.description }
                    />
                  </span>
                  <Button onClick={ this.onPhraseSubmit } type="4">
                    Okay
                  </Button>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}
