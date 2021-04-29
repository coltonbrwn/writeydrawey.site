import onetime from 'onetime'
import PlayerNav from './nav/player-nav'
import Button from './ui/button'
import Input from './ui/input'
import * as api from '../lib/api'

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

  onPhraseInputKeyDown = e => {
    if (e.key === 'Enter') {
      this.onJoinGameClick()
    }
  }

  onJoinGameClick = () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    this.submit()
  }

  submit = onetime(async () => {
    let updatedState = await api.addPlayer({
      gameId: this.props.gameState.id,
      player: {
        playerName: this.state.playerName
      }
    })
    updatedState = await api.playerInput({
      gameId: this.props.gameState.id,
      phrase: this.state.phrase,
      round: 0
    })
    this.props.onUpdateState(updatedState)
  })

  render() {
    const { gameState, viewer } = this.props;
    const adminPlayer = gameState.pendingPlayers.find( p => p.playerId === gameState.admin )
    const inviteCopy = adminPlayer
      ? <span><b>{ adminPlayer.playerName }</b> has invited you to play a game of <i>writeydrawey</i>!</span>
      : <span>Welcome to <i>writeydrawey</i></span>
    return (
      <div className="full-height">
        <PlayerNav gameState={ gameState } viewer={ viewer } />
        <div className="join flex-container full-height">
          <div className="input-container">
              <h3 className="text--left">
                { inviteCopy }
                <br/>
                <br/>
              </h3>
              <Input
                label="your name"
                onChange={ this.onNameInputChanage }
                lineType={ 0 }
              />
              <Input
                label="a phrase"
                onChange={ this.onPhraseInputChange }
                onKeyDown={ this.onPhraseInputKeyDown }
                lineType={ 0 }
              />
              <Button onClick={ this.onJoinGameClick }>
                Join Game
              </Button>
          </div>
        </div>
      </div>
    )
  }
}
