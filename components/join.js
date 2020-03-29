import * as api from '../lib/api';

export default class Home extends React.Component {

  onJoinClick = async () => {

  }

  render() {
    return (
      <div>
        <h1>Join A Game</h1>
        <button
          className="large"
          onClick={ this.onCreateClick }
        >
          Create a new game
        </button>
        <input className="large" onChange={ this.onInputChange }>

        </input>
        <iframe id="drawingCanvas" src="/canvas/index.html" />
      </div>
    )
  }
}
