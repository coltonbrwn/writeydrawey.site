import { get } from 'dotty';
import Router from 'next/router';
import Layout from '../components/layout';
import Home from '../components/home';
import Phrases from '../components/phrases';
import Starting from '../components/starting';
import Playing from '../components/playing';
import RoundOver from '../components/round-over';
import CreatePlayer from '../components/create-player';
import Done from '../components/done';
import { GAME_STATE, INITIAL_STATE } from '../backend/constants';
import * as api from '../lib/api';

import "../styles/styles.scss";

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
          player: JSON.parse(localStorage.getItem('player'))
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
    switch (gameState.state) {
      case GAME_STATE.STARTING:
        if (!get(player, 'id')) {
          return CreatePlayer
        } else if (!get(gameState, `playerInput.${ player.id }`)) {
          return Phrases
        } else {
          return Starting
        }
      case GAME_STATE.PLAYING:
        return Playing;
      case GAME_STATE.ROUND_OVER:
        return RoundOver;
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
        <Component { ...this.state }/>
      </Layout>
    );
  }

}
