import { v4 } from 'uuid';
import * as api from '../lib/api';

export default class AddPlayer extends React.Component {

  constructor() {
    super()
    this.state = {
      playerId: '',
      playerName: '',
      phrase: ''
    }
  }

  componentDidMount() {
    try {
      this.setState({
        ...JSON.parse(sessionStorage.getItem('player'))
      })
    } catch (e) { }
    if (!this.state.player || !this.state.player.id) {
      this.setState({
        playerName: '',
        playerId: v4()
      })
    }
  }

  validate() {
    if (!this.state.phrase) {
      throw new Error('Missing Phrase')
    } else if (!this.props.gameState.id) {
      throw new Error('No Game ID found')
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

  onSubmit = async () => {
    try {
      const player = {
        playerId: this.state.playerId,
        playerName: this.state.playerName
      }
      window.sessionStorage.setItem('player', JSON.stringify(player));
      this.validate()
      await api.addPlayer({
        gameId: this.props.gameState.id,
        player
      })
      await api.playerInput({
        gameId: this.props.gameState.id,
        playerId: player.playerId,
        phrase: this.state.phrase,
        round: 0
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div>
        <h1>Joining Game <span className="mono">#{ this.props.gameState.id }</span></h1>
        <div>
          <input
            className="large"
            placeholder="Your Name"
            onChange={ this.onNameInputChanage }
            value={ this.state.playerName }
          />
        </div>
        <h1>Choose A Phrase</h1>
        <textarea
          className="large"
          placeholder="Your Phrase"
          onChange={ this.onPhraseInputChange }
          value={ this.state.phrase }
        />
        <button onClick={ this.onSubmit }>
          Next
        </button>
      </div>
    )
  }
}
