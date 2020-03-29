import Router from 'next/router';
import Layout from '../components/layout';
import Home from '../components/home';
import Starting from '../components/starting';
import Playing from '../components/playing';
import RoundOver from '../components/round-over';
import Done from '../components/done';
import { GAME_STATE } from '../backend/constants';
import * as api from '../lib/api';

import "../styles/styles.scss";

export default class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      gameState: {}
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(async () => {
      const gameId = Router.query.slug;
      if (!gameId) {
        return;
      }
      const response = await api.getGameState({ gameId });
      this.setState({
        gameState: response
      })
    }, 2000)
  }

  getComponent() {
    const { gameState } = this.state;
    switch (gameState.status) {
      case GAME_STATE.STARTING:
        return Starting;
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
