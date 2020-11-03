import Button from './button'
import Logo from './svg/logo'
import TurnTimer from './turn-timer'
import * as api from '../lib/api'
import { GAME_STATE, TURN_LIMIT } from '../backend/constants'

export default class Starting extends React.Component {

  onNextRoundClick = () => {
    try {
      api.nextRound({
        gameId: this.props.gameState.id,
        round: this.props.gameState.round
      }).then( this.props.onUpdateState )
    } catch (e) {
      console.log(e)
    }
  }

  onEndGameClick = () => {
    try {
      api.endGame({
        gameId: this.props.gameState.id
      }).then( this.props.onUpdateState )
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { gameState, viewer } = this.props
    const numRounds = gameState.options.rounds
    const isAdminPlayer = gameState.admin === viewer.userId
    let playersReadyMap = {}, numPlayersReady = 0
    gameState.players.forEach( p => {
      const isPlayerReady = gameState.playerInput.find( item => (
        item.playerId === p.playerId && item.round === gameState.round
      ))
      if(isPlayerReady) {
        numPlayersReady++
      }
      playersReadyMap[ p.playerId ] = isPlayerReady
    })

    const allPlayersReady = numPlayersReady === gameState.players.length

    return (
      <div className="content-container">
        <div className="nav">
          <div className="logo">
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="text">
            <p>
              time limit &nbsp;&nbsp;&nbsp; <TurnTimer defaultTimeMs={ gameState.options.time_limit ? TURN_LIMIT : 'none' } />
              <br/>
              round &nbsp;&nbsp;&nbsp;&nbsp; { gameState.round } / { numRounds }
            </p>
          </div>
        </div>
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
                <Button onClick={ this.onNextRoundClick } type="3">
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
