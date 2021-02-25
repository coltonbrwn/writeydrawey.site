import onetime from 'onetime'

import * as api from '../lib/api'
import Logo from './logo'
import Button from './ui/button'
import GameOverviewNav from './game-overview-nav'
import DrawingCanvas from './drawing-canvas'
import { isGameOver, areAllPlayersReady } from '../lib/util'

export default class Home extends React.Component {

  constructor({gameState, viewer }) {
    super()
    const currentTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === viewer.userId);
    this.state = {
      description: '',
      startedTimer: Boolean(currentTimer),
      startedDrawing: false
    }
  }

  componentDidUpdate(props, state) {
    const currentTimer = this.props.gameState.timers.find( item => item.round === this.props.gameState.round && item.playerId === this.props.viewer.userId);
    if (currentTimer && new Date().getTime() > currentTimer.end) {
      const isDrawingRound = Boolean(this.props.gameState.round % 2)
      if (isDrawingRound) {
        this.submitDrawing()
      } else {
        this.submitPhrase()
      }
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

  onDescriptionKeyDown = e => {
    console.log(e.key)
    if (e.key === 'Enter') {
      this.onDescriptionDoneClick()
    }
  }

  onDrawingInteractionStart = () => {
    this.setState({
      startedDrawing: true
    })
    this.startTimer()
  }

  onDescriptionDoneClick = () => {
    if (this.state.description) {
      this.submitPhrase()
    }
  }

  onDrawingDoneClick = () => {
    if (this.state.startedDrawing) {
      this.submitDrawing()
    }
  }

  startTimer = onetime( async () => {
    if (!this.props.gameState.options.time_limit) {
      return
    }
    try {
      const updatedState = await api.setTimer({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round
      })
      this.props.onUpdateState(updatedState)
      this.setState({
        startedTimer: true
      })
    } catch (e) {
      console.log(e)
    }
  })

  submitPhrase = onetime( async () => {
    try {
      let updatedState = await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        phrase: this.state.description
      })
      this.processGameStateAfterSubmission(updatedState)
    } catch (e) {
      console.log(e)
    }
  })

  submitDrawing = onetime( async () => {
    try {
      const dataUrl = document
        .getElementById('drawingCanvas')
        .contentWindow.document
        .getElementById('myCanvas')
        .toDataURL("image/png");
      const updatedState = await api.playerInput({
        playerId: this.props.viewer.userId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        drawing: dataUrl
      })
      this.processGameStateAfterSubmission(updatedState)
    } catch (e) {
      console.log(e)
    }
  })

  async processGameStateAfterSubmission(gameState) {
    let updatedState = gameState
    if (isGameOver(updatedState)) {
      updatedState = await api.endGame({
        gameId: this.props.gameState.id,
      })
    } else if (areAllPlayersReady(updatedState)) {
      updatedState = await api.nextRound({
        gameId: this.props.gameState.id,
        round: this.props.gameState.round
      })
    }
    this.props.onUpdateState(updatedState)
  }

  render() {
    const { gameState, viewer } = this.props;
    const isDrawingRound = Boolean(gameState.round % 2)
    const leftHandPlayerInput = this.getLeftHandPlayer()
  
    return (
      <div className="playing full-height">
        <div className="nav">
          <Logo />
          <GameOverviewNav { ...this.props } />
        </div>
        {
          isDrawingRound
            ? (
              <div className="flex-container full-height small-pad">
                <DrawingCanvas onInteractionStart={ this.onDrawingInteractionStart } />
                <div className="bottom-margin">
                  <div className="mono">
                    draw&nbsp;
                  </div>
                  <h3>
                    "{ leftHandPlayerInput.phrase }"
                  </h3>
                  <Button onClick={ this.onDrawingDoneClick }>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-container full-height small-pad">
                <img
                  className="playerDrawing"
                  src={ leftHandPlayerInput.drawing } />
                <div className="bottom-margin">
                  <span className="input-wrapper">
                    <h3>
                      describe this
                    </h3>
                    <input
                      onFocus={ this.startTimer }
                      onChange={ this.onDescriptionChange }
                      onKeyDown={ this.onDescriptionKeyDown }
                      value={ this.state.description }
                    />
                  </span>
                  <Button onClick={ this.onDescriptionDoneClick }>
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
