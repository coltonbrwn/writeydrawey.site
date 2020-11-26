import onetime from 'onetime'
import Layout from './layout'
import Nav from './nav'
import PlayerInput from './player-input'
import * as api from '../lib/api'
import { baseUrlFrontend } from '../backend/constants'

import "../styles/styles.scss"

class New extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  onSubmit = async ({ playerName, phrase }) => {
    if (!playerName || !phrase) {
      return
    }
    const { response:{ id } } = await api.createNewGame({
      options: {
        time_limit: true
      }
    });
    await api.addPlayer({
      gameId: id,
      player: {
        playerName
      }
    })
    const gameState = await api.playerInput({
      gameId: id,
      phrase: phrase,
      round: 0
    })
    
    // this.props.onUpdateState(gameState)

    document.location = `http://${ baseUrlFrontend() }/${ id }`
  }

  render() {
    return (
      <Layout theme="light">
        <div className="full-height">
          <Nav noHome />
          <PlayerInput parentComponentType="new" onSubmit={ this.onSubmit }/>
        </div>
      </Layout>
    )
  }
}

export default New
