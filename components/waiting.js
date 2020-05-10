
import Nav from './nav'
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

  onEndGameClick = () => {
    api.endGame({
      gameId: this.props.gameState.id
    })
  }

  render() {
    const { gameState, viewer } = this.props;
    const isAdminPlayer = gameState.admin === viewer.userId;
    const allPlayersReady = gameState.players.reduce((acc, val) => {
      return acc && gameState.playerInput.find( item => (
        item.playerId === val.playerId && item.round === gameState.round
      ))
    }, true)
    return (
      <div className="content-container">
        <Nav noHome textOverride="waiting for others..." />
        <div className="waiting flex-container">
          <div className="players">
            {
              this.props.gameState.players.map( p => {
                const isPlayerReady = gameState.playerInput.find( item => (
                  item.playerId === p.playerId && item.round === gameState.round
                ))
                const isAdmin = gameState.admin === p.playerId
                return (
                  <h4
                    key={ p.playerId }
                    className={ isPlayerReady ? 'strikethrough' : ''}
                    title={ isPlayerReady ? 'done' : 'waiting'}
                  >
                    { p.playerName }
                  </h4>
                )
              })
            }
          </div>
          <div className="bottom-margin">
            {
              isAdminPlayer &&
              this.props.gameState.state === GAME_STATE.STARTING && (
                <button onClick={ this.onStartClick }>
                  Start Game
                </button>
              )
            }
            {
              isAdminPlayer && allPlayersReady &&
              this.props.gameState.state === GAME_STATE.PLAYING && (
                <button onClick={ this.onNextRoundClick }>
                  Next Round
                </button>
              )
            }
            {
              isAdminPlayer && allPlayersReady &&
              this.props.gameState.state === GAME_STATE.PLAYING && (
                <button onClick={ this.onEndGameClick }>
                  End Game
                </button>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
