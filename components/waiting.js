import Button from './button'
import GameNav from './game-nav'
import * as api from '../lib/api'
import { GAME_STATE } from '../backend/constants'

export default class Starting extends React.Component {

  constructor() {
    super()
  }

  onStartClick = async () => {
    await api.startGame({
      gameId: this.props.gameState.id
    })
    await api.nextRound({
      gameId: this.props.gameState.id
    })
  }

  onNextRoundClick = () => {
    api.nextRound({
      gameId: this.props.gameState.id
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
    let playersReadyMap = {}, numPlayersReady = 0;
    gameState.players.forEach( p => {
      const isPlayerReady = gameState.playerInput.find( item => (
        item.playerId === p.playerId && item.round === gameState.round
      ))
      if(isPlayerReady) {
        numPlayersReady++;
      }
      playersReadyMap[ p.playerId ] = isPlayerReady
    })

    const allPlayersReady = numPlayersReady === gameState.players.length;

    return (
      <div className="content-container">
        <GameNav gameState={ gameState } />
        <div className="waiting flex-container">
          <div className="players">
            {
              this.props.gameState.players
                .map( p => (
                  <h3
                    title={ playersReadyMap[ p.playerId ] ? 'ready' : 'waiting' }
                    className={ playersReadyMap[ p.playerId ] ? '' : 'player--notready' }
                    key={ p.playerId }>
                      { p.playerName }
                  </h3>
                ))
            }
          </div>
          <div className="bottom-margin">
            {
              isAdminPlayer &&
              this.props.gameState.state === GAME_STATE.STARTING && (
                <Button onClick={ this.onStartClick } type="3">
                  Start Game
                </Button>
              )
            }
            {
              isAdminPlayer && allPlayersReady &&
              this.props.gameState.state === GAME_STATE.PLAYING && (
                <Button onClick={ this.onNextRoundClick } type="3">
                  Next Round
                </Button>
              )
            }
            {
              isAdminPlayer && allPlayersReady &&
              this.props.gameState.state === GAME_STATE.PLAYING && (
                <Button onClick={ this.onEndGameClick } type="5">
                  End Game
                </Button>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
