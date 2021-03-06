import Toggle from 'react-toggle'

import Layout from './layout'
import Logo from './svg/logo'
import Button from './ui/button'
import Input from './ui/input'

import * as api from '../lib/api'
import { TURN_LIMIT } from '../lib/constants'
import { baseUrlFrontend, formatTime } from '../lib/util'

class New extends React.Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      phrase: '',
      timeLimit: false
    }
  }

  onPublicJoinClick = async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    const { gameState: { id } } = await api.findPublicGame({
      options: {
        time_limit: this.state.timeLimit
      }
    });
    await this.addPlayerToGame({ id })
  }

  onNewGameClick = async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    const { gameState: { id } } = await api.createNewGame({
      options: {
        time_limit: this.state.timeLimit
      }
    });
    await this.addPlayerToGame({ id })
  }

  addPlayerToGame = async ({ id }) => {
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
    document.location = `http://${ baseUrlFrontend() }/${ id }`
  }
  
  onNameInputChange = e => {
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
        <div className="nav">
          <a href="/"><Logo /></a>
        </div>
        <div className="join flex-container full-height">
          <div className="input-container">
            <Input
              label="your name"
              onChange={  this.onNameInputChange }
              lineType={ 1 }
            />
            <Input
              label="a phrase"
              onChange={  this.onPhraseInputChange }
              lineType={ 2 }
            />
            <div className="input-container-flex">
                <h3 className="mono input-label">time limit</h3>
                <label className="toggle input-wrapper">
                    <span className="label-text">
                      { this.state.timeLimit ? formatTime( TURN_LIMIT / 1000 ) : 'off'}
                    </span>
                    <Toggle
                        defaultChecked={this.state.timeLimit}
                        icons={false}
                        onChange={this.handleToggleChange}
                    />
                </label>
            </div>
            <div className="buttons-row display--flex">
              <Button onClick={ this.onPublicJoinClick }>
                  Join Public Game  
              </Button>
              <Button onClick={ this.onNewGameClick }>
                  New Game 
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default New
