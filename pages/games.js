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
    console.log(games)
  }

  render() {
    let games = this.props.games || [];
    return (
      <Layout theme="light">
        <div className="full-height">
          <Nav />
          <div className="content-container">
            <div className="games">
              { games.map( game => (
                <div className="game">
                  <a href={`/${ game.id }`}>
                    { game.id }
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
