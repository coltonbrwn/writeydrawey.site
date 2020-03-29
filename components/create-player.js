import * as api from '../lib/api';

export default class CreatePlayer extends React.Component {

  constructor() {
    super()
    this.state = {
      playerName: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      playerName: e.target.value
    })
  }

  onSubmit = () => {
    api.createNewPlayer({
      playerName: this.state.playerName
    })
  }

  render() {
    return (
      <div>
        <h1>Create Your Player</h1>
        <input
          placeholder="Your Name"
          onChange={ this.onInputChange }
          value={ this.state.playerName}
        />
        <button onClick={ this.onSubmit }>
          Next
        </button>
      </div>
    )
  }
}
