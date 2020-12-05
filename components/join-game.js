import onetime from 'onetime'
import { Nav, NavLink } from './nav'
import Logo from './logo'
import GameOverviewNav from './game-overview-nav'
import * as api from '../lib/api'
import Button from './button'
import GameStartingPlayerList from './game-starting-player-list'

export default class JoinGame extends React.Component {

  constructor() {
    super()
    this.state = {
      playerName: '',
      phrase: ''
    }
  }

  onNameInputChanage = e => {
    this.setState({
      playerName: e.target.value
    })
  }

  onPhraseInputChange = e => {
    this.setState({
      phrase: e.target.value
    })
  }

  onSubmit = onetime(async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    await api.addPlayer({
      gameId: this.props.gameState.id,
      player: {
        playerName: this.state.playerName
      }
    })
    const gameState = await api.playerInput({
      gameId: this.props.gameState.id,
      phrase: this.state.phrase,
      round: 0
    })
    this.props.onUpdateState(gameState)
  })

  render() {
    const { gameState } = this.props;
    const adminPlayer = gameState.players.find( p => p.playerId === gameState.admin )
    return (
      <div className="content-container">
        <div className="nav">
          <Logo />
          <GameOverviewNav gameState={ gameState } />
        </div>
        {
          this.props.playerHasContributed ? (
            <GameStartingPlayerList
              onUpdateState={ this.props.onUpdateState }
              gameState={ gameState }
            />
          ) : (
            <div className="join flex-container">
              <div className="input-container">
                  <h3>
                    { adminPlayer.playerName } has invited you to play a game of <i>writeydrawey</i>!
                    <br/>
                    <br/>
                  </h3>
                  <div className="input-container-flex">
                      <h3 className="mono input-label">your name</h3>
                      <span className="input-wrapper">
                      <input onChange={ this.onNameInputChanage } />
                      </span>
                  </div>
                  <div className="input-container-flex">
                      <h3 className="mono input-label">a phrase</h3>
                      <span className="input-wrapper">
                      <input onChange={ this.onPhraseInputChange } />
                      </span>
                  </div>
                  <Button onClick={ this.onSubmit }>
                    Join Game
                  </Button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
