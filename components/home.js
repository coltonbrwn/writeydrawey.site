import * as api from '../lib/api';

export default class Home extends React.Component {

  async onCreateClick() {
    const { gameId } = await api.createNewGame();
    document.location = `/${ gameId }`;
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Writey Drawey Game.</h1>
        <p>
          We didn't find an in-progress game at this location.
        </p>
        <button
          className="large"
          onClick={ this.onCreateClick }
        >
          Create a new game
        </button>
        <iframe id="drawingCanvas" src="/canvas/index.html" />
      </div>
    )
  }
}
