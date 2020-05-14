import { v4 } from 'uuid';
import Nav from './nav';
import * as api from '../lib/api';
import Button from './button';

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
      <div className="content-container">
        <Nav noHome textOverride="joining game..." />
        <div className="join flex-container">
          <div className="input-container">
            <div className="input-container-flex">
              <h3 className="mono">your name:</h3>
              <span className="input-wrapper">
                <input
                  onChange={ this.onNameInputChanage }
                  value={ this.state.playerName }
                />
              </span>
            </div>
            <div className="input-container-flex">
              <h3 className="mono">a phrase:</h3>
              <span className="input-wrapper">
                <input
                  onChange={ this.onPhraseInputChange }
                  value={ this.state.phrase }
                />
                <span className="subtext">
                  (anything)
                </span>
              </span>
            </div>
          </div>
          <Button onClick={ this.onSubmit } type="2">
            Next
          </Button>
        </div>
      </div>
    )
  }
}
