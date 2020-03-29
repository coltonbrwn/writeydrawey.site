import * as api from '../lib/api';

export default class Home extends React.Component {

  onCreateClick = async () => {
    let id;
    try {
      const {response:{id}} = await api.createNewGame();
      document.location = `/${ id }`;
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Writey Drawey Game.</h1>
        {
          this.props.statusCode == 404 && (
            <p>We couldn't find a game here</p>
          )
        }
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
