
import * as api from '../lib/api';

const NUM_PHRASES = 1;

export default class Phrases extends React.Component {

  constructor() {
    super();
    this.state = {
      phrases: {}
    }
  }

  inputHandler = i => e => {
    const phrases = this.state.phrases;
    phrases[i] = e.target.value;
    this.setState({
      phrases
    })
  }

  onSubmit = () => {
    for (var i = 0; i < NUM_PHRASES; i++) {
      if(!Boolean(this.state.phrases[i])) {
        return;
      }
    }
    api.playerInput({
      player: this.props.player.id,
      phrase: this.state.phrases[0],
      game: this.props.gameState.id,
      round: 0
    })
  }

  render() {
    const inputs = [];
    for (var i = 0; i < NUM_PHRASES; i++) {
      inputs.push(
        <input
          className="large"
          key={ i + ''}
          onChange={ this.inputHandler(i) }
        />
      )
    }

    return (
      <div>
        <h1>{this.props.player.name}, Enter Your Phrase</h1>
        <div>
          { inputs }
        </div>
        <button
          className="large"
          onClick={ this.onSubmit }
        >
          Next
        </button>
      </div>
    )
  }
}
