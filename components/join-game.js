import onetime from 'onetime'
import Nav from './nav'
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
    return (
      <div className="content-container">
        <Nav noHome textOverride="joining game..." />
        {
          this.props.playerHasContributed ? (
            <GameStartingPlayerList
              onUpdateState={ this.props.onUpdateState }
              gameState={ this.props.gameState }
            />
          ) : (
            <div className="join flex-container">
              <div className="input-container">
                  <div className="input-container-flex">
                      <h3 className="mono">your name:</h3>
                      <span className="input-wrapper">
                      <input onChange={ this.onNameInputChanage } />
                      </span>
                  </div>
                  <div className="input-container-flex">
                      <h3 className="mono">a phrase:</h3>
                      <span className="input-wrapper">
                      <input onChange={ this.onPhraseInputChange } />
                      <span className="subtext">
                          (anything)
                      </span>
                      </span>
                  </div>
              </div>
              <Button onClick={ this.onSubmit }>
                Join Game
              </Button>
            </div>
          )
        }
      </div>
    )
  }
}
