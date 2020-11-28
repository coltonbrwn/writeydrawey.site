import onetime from 'onetime'
import Toggle from 'react-toggle'

import Layout from './layout'
import Nav from './nav'
import Button from './button'
import * as api from '../lib/api'
import { TURN_LIMIT } from '../backend/constants'
import { baseUrlFrontend, formatTime } from '../lib/util'

import "../styles/styles.scss"

class New extends React.Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      phrase: '',
      timeLimit: false
    }
  }

  onSubmit = async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    const { response:{ id } } = await api.createNewGame({
      options: {
        time_limit: this.state.timeLimit
      }
    });
    await api.addPlayer({
      gameId: id,
      player: {
        playerName: this.state.playerName
      }
    })
    const gameState = await api.playerInput({
      gameId: id,
      phrase: this.state.phrase,
      round: 0
    })
    
    // this.props.onUpdateState(gameState)

    document.location = `http://${ baseUrlFrontend() }/${ id }`
  }
  
  onNameInputChanage = e => {
    this.setState({
      playerName: e.target.value
    })
  }

  onPhraseInputChange = e => {
    this.setState({
      phrase: e.target.value
    })
  }

  handleToggleChange = e => {
    this.setState({
        timeLimit: e.target.checked
    })
  }

  render() {
    return (
      <Layout theme="light">
        <div className="full-height">
          <Nav noHome />
          <div className="join flex-container">
            <div className="input-container">
                <div className="input-container-flex">
                    <h3 className="mono">your name:</h3>
                    <span className="input-wrapper">
                    <input onChange={ this.onNameInputChanage } />
                    </span>
                </div>
                <div className="input-container-flex">
                    <h3 className="mono">a phrase:</h3>
                    <span className="input-wrapper">
                    <input onChange={ this.onPhraseInputChange } />
                    <span className="subtext">
                        (anything)
                    </span>
                    </span>
                </div>
                <div className="input-container-flex">
                    <h3 className="mono">time limit:</h3>
                    <label className="toggle">
                        <span>{ this.state.timeLimit ? formatTime( TURN_LIMIT / 1000 ) : 'off'}</span>
                        <Toggle
                            defaultChecked={this.state.timeLimit}
                            icons={false}
                            onChange={this.handleToggleChange}
                        />
                    </label>
                </div>
            </div>
            <Button onClick={ this.onSubmit }>
              New Game
            </Button>
        </div>
        </div>
      </Layout>
    )
  }
}

export default New
