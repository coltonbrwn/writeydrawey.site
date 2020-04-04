import { get } from 'dotty';
import Router from 'next/router';
import Layout from '../components/layout';
import Home from '../components/home';
import Phrases from '../components/phrases';
import Waiting from '../components/waiting';
import Playing from '../components/playing';
import RoundOver from '../components/round-over';
import JoinGame from '../components/join-game';
import Done from '../components/done';
import { GAME_STATE, INITIAL_STATE } from '../backend/constants';
import * as api from '../lib/api';

import "../styles/styles.scss";

function playerHasContributed(gameState, player) {
  try {
    const playerContribution = gameState.playerInput.find( input => (
      input.round === gameState.round && input.playerId === player.playerId
    ))
    return Boolean(playerContribution);
  } catch (e) {
    console.log(e)
    return false;
  }
}

export default class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      gameState: INITIAL_STATE,
      player: null,
      error: null,
      statusCode: 200
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(async () => {
      const gameId = Router.query.slug;
      if (!gameId) {
        return;
      }
      try {
        const response = await api.getGameState({ gameId });
        this.setState({
          gameState: response,
          player: JSON.parse(window.sessionStorage.getItem('player'))
        })
      } catch (e) {
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

    if (playerHasContributed(gameState, player)) {
      return Waiting;
    }

    switch (gameState.state) {
      case GAME_STATE.STARTING:
        return JoinGame;
      case GAME_STATE.PLAYING:
        return Playing;
      case GAME_STATE.DONE:
        return Done;
      default:
        return Home;
    }
  }

  render() {
    const Component = this.getComponent();
    return (
      <Layout theme="light">
        {
          this.state.player && (
            <div style={{textAlign: 'left'}}>
              <div>
                { this.state.player.playerName }
              </div>
              <div>
                { this.state.player.playerId }
              </div>
            </div>
          )
        }
        <Component { ...this.state }/>
      </Layout>
    );
  }

}
