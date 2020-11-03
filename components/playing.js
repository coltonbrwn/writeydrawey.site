import * as api from '../lib/api'
import Logo from './svg/logo'
import TurnTimer from './turn-timer'
import Button from './button'
import { TURN_LIMIT } from '../backend/constants'

export default class Home extends React.Component {

  constructor({gameState, viewer }) {
    super()
    const currentTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === viewer.userId);
    this.state = {
      description: '',
      startedTimer: Boolean(currentTimer)
    }
  }

  componentDidUpdate(props, state) {
    const currentTimer = this.props.gameState.timers.find( item => item.round === this.props.gameState.round && item.playerId === this.props.viewer.userId);
    if (currentTimer && new Date().getTime() > currentTimer.end) {
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

  onStartTimerClick = async () => {
    try {
      await api.setTimer({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round
      })
        .then(this.props.onUpdateState)
        .then(() => {
          this.setState({
            startedTimer: true
          })
        })
    } catch (e) {
      console.log(e)
    }
  }

  onPhraseSubmit = async () => {
    try {
      await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        phrase: this.state.description
      }).then(this.propsOnUpdateState)
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
      }).then(this.propsOnUpdateState)
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    const { gameState, viewer } = this.props;

    if (!(viewer && gameState.players.find( p => p.playerId === this.props.viewer.userId ))) {
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

    const roundTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === '0');
    if (roundTimer && new Date().getTime() < roundTimer.end) {
      return (
        <div className="full-height">
          <div className="flex-container">
            <h2>
              Next round starting!
            </h2>
            <h1>
              <TurnTimer timer={ roundTimer } />
            </h1>
          </div>
        </div>
      )
    }

    const numRounds = gameState.players.length
    const isDrawingRound = Boolean(gameState.round % 2)
    const leftHandPlayerInput = this.getLeftHandPlayer()
    const startedTimer = this.state.startedTimer
    const playerTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === viewer.userId)

    return (
      <div className="playing full-height">
        <div className="nav">
          <div className="logo">
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="text">
            <p>
              time limit &nbsp;&nbsp;&nbsp;<TurnTimer timer={ playerTimer } defaultTimeMs={ gameState.options.time_limit ? TURN_LIMIT : 'none' }/>
              <br/>
              round &nbsp;&nbsp;&nbsp;&nbsp; { gameState.round } / { numRounds }
            </p>
          </div>
        </div>
        {
          isDrawingRound
            ? (
                this.state.startedTimer ? (
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
                    <Button onClick={ this.onStartTimerClick }>
                      Start
                    </Button>
                  </div>
                )
            ) : (
              this.state.startedTimer ? (
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
              ) : (
                <div className="flex-container">
                  <img
                    className="playerDrawing preview"
                    src={ leftHandPlayerInput.drawing } />
                  <Button onClick={ this.onStartTimerClick } className="preview--button">
                    Describe This
                  </Button>
                </div>
              )
          )
        }
      </div>
    )
  }
}
