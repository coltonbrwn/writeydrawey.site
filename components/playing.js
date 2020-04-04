import * as api from '../lib/api';

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      description: ''
    }
  }

  getLeftHandPlayer() {
    const { gameState, player } = this.props
    const myPlayerIndex = gameState.players.findIndex( p => p.playerId === player.playerId )
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
        playerId: this.props.player.playerId,
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
        playerId: this.props.player.playerId,
        gameId: this.props.gameState.id,
        round: this.props.gameState.round,
        drawing: dataUrl
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const myId = this.props.player.playerId
    const isDrawingRound = Boolean(this.props.gameState.round % 2)
    const leftHandPlayerInput = this.getLeftHandPlayer()
    return (
      <div>
        <div style={{textAlign: 'left'}}>
          Viewing: { leftHandPlayerInput.playerId }
        </div>
        <h3>{ this.props.gameState.round }</h3>
        {
          isDrawingRound
            ? (
              <div>
                <h1>Draw "{ leftHandPlayerInput.phrase }"</h1>
                <iframe id="drawingCanvas" src="/canvas/index.html" />
                <button className="large" onClick={ this.onDrawingSubmit }>
                  Okay
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
