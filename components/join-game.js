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
        playerName: this.state.playerName
      }
      this.validate()
      await api.addPlayer({
        gameId: this.props.gameState.id,
        player
      })
      await api.playerInput({
        gameId: this.props.gameState.id,
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
