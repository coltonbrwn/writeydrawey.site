import Layout from '../components/layout';
import Nav from '../components/nav';
import * as api from '../lib/api'

import "../styles/styles.scss";

export default class Games extends React.Component {

  static async getInitialProps({ req, query }) {
    try {
      const { response: games } = await api.getCompletedGames()
      return {
        games,
        statusCode: 200
      }
    } catch (e) {
      return {
        games: [],
        statusCode: 500
      }
    }
  }

  render() {
    let games = this.props.games || [];
    return (
      <Layout theme="light">
        <div className="full-height">
          <Nav />
          <div className="content-container">
            <div className="images-page">
              {
                games.map( game => game.playerInput
                  .filter( input => input.drawing)
                  .map( input => (
                      <div className="player-image">
                        <img src={ input.drawing } />
                      </div>
                    )
                  ))
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
