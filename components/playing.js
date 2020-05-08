import * as api from '../lib/api';

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      description: ''
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
          <h3>It wouldn't really make sense to let you jump in</h3>
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
    return (
      <div>
        <h3>{ this.props.gameState.round }</h3>
        {
          isDrawingRound
            ? (
              <div>
                <h1>Draw "{ leftHandPlayerInput.phrase }"</h1>
                <iframe id="drawingCanvas" src="/canvas/index.html" />
                <button className="large" onClick={ this.onDrawingSubmit }>
                  I'm Done Drawing
                </button>
              </div>
            ): (
              <div>
                <h1>Describe This</h1>
                <textarea onChange={ this.onDescriptionChange } value={ this.state.description }/>
                <button className="large" onClick={ this.onPhraseSubmit }>
                  Okay
                </button>
                <img className="playerDrawing" src={ leftHandPlayerInput.drawing } />
              </div>
            )
        }

      </div>

    )
  }
}
