
import * as api from '../lib/api'
import { GAME_STATE } from '../backend/constants'

export default class Starting extends React.Component {

  constructor() {
    super()
  }

  onStartClick = () => {
    api.startGame({
      gameId: this.props.gameState.id
    })
  }

  onNextRoundClick = () => {
    api.nextRound({
      gameId: this.props.gameState.id,
      round: this.props.gameState.round + 1
    })
  }

  render() {
    const { gameState, player } = this.props;
    const isAdminPlayer = gameState.players.findIndex( p => (
      player.playerId === p.playerId
    )) === 0;
    const allPlayersReady = gameState.players.reduce((acc, val) => {
      return acc && gameState.playerInput.find( item => (
        item.playerId === val.playerId && item.round === gameState.round
      ))
    }, true)
    return (
      <div>
        <h1>Waiting for other players</h1>
        <h3><strong>Players in the game:</strong></h3>
        {
          this.props.gameState.players.map( p => {
            const isPlayerReady = gameState.playerInput.find( item => (
              item.playerId === p.playerId && item.round === gameState.round
            ))
            const isAdminPlayer = gameState.players.findIndex( item => (
              item.playerId === p.playerId
            )) === 0;
            return (
              <div
                className={ isPlayerReady ? 'strikethrough' : ''}
                key={ p.playerId }
              >
                { !isAdminPlayer ? '' : <strong>*</strong> }
                { p.playerName }
              </div>
            )
          })
        }
        {
          isAdminPlayer &&
          this.props.gameState.state === GAME_STATE.STARTING && (
            <button
              className="large"
              onClick={ this.onStartClick }
            >
              Start Game
            </button>
          )
        }
        {
          isAdminPlayer && allPlayersReady &&
          this.props.gameState.state === GAME_STATE.PLAYING && (
            <button
              className="large"
              onClick={ this.onNextRoundClick }
            >
              Next Round
            </button>
          )
        }
        {
          isAdminPlayer && allPlayersReady &&
          this.props.gameState.state === GAME_STATE.PLAYING && (
            <button
              className="large"
              onClick={ this.onEndGameClick }
            >
              End Game
            </button>
          )
        }
      </div>
    )
  }
}
