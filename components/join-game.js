import onetime from 'onetime'
import Nav from './nav'
import * as api from '../lib/api'
import PlayerInput from './player-input'
import GameStartingPlayerList from './game-starting-player-list'

export default class AddPlayer extends React.Component {

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

  onSubmit = onetime(async ({ playerName, phrase }) => {
    if (!playerName || !phrase) {
      return
    }
    await api.addPlayer({
      gameId: this.props.gameState.id,
      player: {
        playerName
      }
    })
    const gameState = await api.playerInput({
      gameId: this.props.gameState.id,
      phrase,
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
              gameState={ this.props.gameState }
            />
          ) : (
            <PlayerInput
              parentComponentType="join-game"
              onSubmit={ this.onSubmit }
              gameState={ this.props.gameState }
            />
          )
        }
      </div>
    )
  }
}
