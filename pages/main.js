import { get } from 'dotty'
import Router from 'next/router'
import Layout from '../components/layout'
import Home from '../components/home'
import Waiting from '../components/waiting'
import Playing from '../components/playing'
import JoinGame from '../components/join-game'
import Done from '../components/done'
import { GAME_STATE, INITIAL_STATE } from '../backend/constants'
import * as api from '../lib/api'

import "../styles/styles.scss"

function playerHasContributed(gameState, player) {
  try {
    const playerContribution = gameState.playerInput.find( input => (
      input.round === gameState.round && input.playerId === player.playerId
    ))
    return Boolean(playerContribution);
  } catch (e) {
    return false;
  }
}

export default class Main extends React.Component {

  constructor({ gameState, statusCode }) {
    super()
    this.state = {
      gameState: gameState || INITIAL_STATE,
      player: null,
      error: null,
      statusCode
    }
  }

  static async getInitialProps({ req, query }) {
    console.log(req.headers)
    if (!query.slug) {
      return {
        gameState: INITIAL_STATE,
        statusCode: 200
      }
    }
    try {
      const { gameState, viewer } = await api.getGameState({ gameId: query.slug });
      return {
        gameState,
        viewer,
        statusCode: 200
      }
    } catch (e) {
      console.log(e)
      return {
        gameState: INITIAL_STATE,
        statusCode: 404
      }
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(async () => {
      const gameId = Router.query.slug;
      if (!gameId) {
        return;
      }
      try {
        const { gameState, viewer } = await api.getGameState({ gameId });
        this.setState({
          gameState,
          viewer
        })
        if (gameState.state === GAME_STATE.DONE) {
          window.clearInterval(this.interval);
        }
      } catch (e) {
        console.log(e)
        this.setState({
          gameState: INITIAL_STATE,
          statusCode: get(e, 'request.status')
        })
        window.clearInterval(this.interval);
      }
    }, 2000)
  }

  getComponent() {
    const { gameState, player } = this.state;
    if (gameState.state === GAME_STATE.DONE) {
      return Done
    } else if (playerHasContributed(gameState, player)) {
      return Waiting
    } else if (gameState.state === GAME_STATE.STARTING) {
      return JoinGame
    } else if (gameState.state === GAME_STATE.PLAYING) {
      return Playing
    } else {
      return Home
    }
  }

  render() {
    const Component = this.getComponent();
    return (
      <Layout theme="light">
        {
          this.state.player && (
            <div style={{textAlign: 'left', position: 'absolute'}}>
              { this.state.player.playerName }
            </div>
          )
        }
        <Component { ...this.state }/>
      </Layout>
    );
  }

}
