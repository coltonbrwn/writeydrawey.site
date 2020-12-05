import { get } from 'dotty'
import Router from 'next/router'
import Layout from '../components/layout'
import Home from '../components/home'
import Waiting from '../components/waiting'
import Playing from '../components/playing'
import JoinGame from '../components/join-game'
import GameInProgress from '../components/game-in-progress'
import NextRoundCountdown from '../components/next-round-countdown'
import Done from '../components/done'
import { GAME_STATE, INITIAL_STATE } from '../backend/constants'
import * as api from '../lib/api'

import "../styles/styles.scss"

const UPDATE_INTERVAL = 2000;

export default class Main extends React.Component {

  constructor({ gameState, viewer, statusCode }) {
    super()
    this.state = {
      gameState: gameState || INITIAL_STATE,
      viewer,
      error: null,
      statusCode
    }
  }

  playerHasContributed() {
    const { gameState, viewer } = this.state
    try {
      const playerContribution = gameState.playerInput.find( input => (
        input.round === gameState.round && input.playerId === viewer.userId
      ))
      return Boolean(playerContribution)
    } catch (e) {
      return false;
    }
  }

  static async getInitialProps({ req, query }) {
    if (!query.slug) {
      return {
        gameState: INITIAL_STATE,
        statusCode: 200
      }
    }
    try {
      const { gameState, viewer } = await api.getGameState({ gameId: query.slug }, req)
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
      const gameId = Router.query.slug
      if (!gameId) {
        return;
      }
      try {
        const { gameState, viewer } = await api.getGameState({ gameId })
        this.setState({
          gameState,
          viewer
        })
        if (gameState.state === GAME_STATE.DONE) {
          window.clearInterval(this.interval)
        }
      } catch (e) {
        console.log(e)
        this.setState({
          gameState: INITIAL_STATE,
          statusCode: get(e, 'request.status')
        })
        window.clearInterval(this.interval)
      }
    }, UPDATE_INTERVAL)
  }

  updateGameState = gameState => {
    if (!gameState) {
      console.log('Failed to update state - gameState was empty')
      return
    }
    this.setState({
      gameState
    })
  }

  getComponent() {
    const { gameState, viewer } = this.state
    const roundTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === '0')
    const hasValidTimer = roundTimer && roundTimer.end > new Date().getTime()
    const viewerIsPartOfGame = gameState.players.find( p => p.playerId === viewer.userId )

    if (gameState.state === GAME_STATE.DONE) {
      return Done
    } else if (gameState.state === GAME_STATE.STARTING) {
      return JoinGame
    } else if (gameState.state === GAME_STATE.PLAYING) {
      if ( !viewerIsPartOfGame ) {
        return GameInProgress
      } else if (hasValidTimer) {
        return NextRoundCountdown
      } else if (this.playerHasContributed()) {
        return Waiting
      } else {
        return Playing
      }
    } else {
      return Home
    }
  }

  render() {
    const Component = this.getComponent();
    return (
      <Layout theme="light">
        {
          this.state.viewer && (
            <div style={{textAlign: 'left', position: 'absolute'}}>
              { this.state.viewer.name }
            </div>
          )
        }
        <Component
          { ...this.state }
          onUpdateState={ this.updateGameState }
          playerHasContributed={ this.playerHasContributed() }
        />
      </Layout>
    );
  }

}
