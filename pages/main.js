import Router from 'next/router';
import Layout from '../components/layout';
import Home from '../components/home';
import Starting from '../components/starting';
import Playing from '../components/playing';
import RoundOver from '../components/round-over';
import Done from '../components/done';
import { GAME_STATE } from '../lib/util';

import "../styles/styles.scss";

export default class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      gameState: null
    }
  }

  componentDidMount() {

  }

  getComponent() {
    const { gameState } = this.state;
    switch (gameState) {
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
