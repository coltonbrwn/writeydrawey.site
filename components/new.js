import Toggle from 'react-toggle'

import Layout from './layout'
import Logo from './ui/logo'
import Button from './ui/button'
import Input from './ui/input'

import * as api from '../lib/api'
import { TURN_LIMIT } from '../lib/constants'
import { appUrl, formatTime } from '../lib/util'

class New extends React.Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      phrase: '',
      timeLimit: false,
      isPublic: false
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
    document.location = `${ appUrl() }/${ id }`
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

  toggleTimeLimit = e => {
    this.setState({
        timeLimit: e.target.checked
    })
  }
  
  togglePublic = e => {
    this.setState({
        isPublic: e.target.checked
    })
  }

  render() {
    return (
      <Layout theme="light" subtitle="new">
        <div className="nav">
          <Logo />
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
            <div className="toggle-container">
              <div className="input-container-flex">
                  <h4 className="mono input-label">time limit</h4>
                  <label className="toggle input-wrapper">
                      <span className="label-text">
                        { this.state.timeLimit ? formatTime( TURN_LIMIT / 1000 ) : 'off'}
                      </span>
                      <Toggle
                          defaultChecked={this.state.timeLimit}
                          icons={false}
                          onChange={this.toggleTimeLimit}
                      />
                  </label>
              </div>
              <div className="input-container-flex">
                  <h4 className="mono input-label">game type</h4>
                  <label className="toggle input-wrapper">
                      <span className="label-text">
                        { this.state.isPublic ? 'public' : 'invite only'}
                      </span>
                      <Toggle
                          defaultChecked={this.state.isPublic}
                          icons={false}
                          onChange={this.togglePublic}
                      />
                  </label>
              </div>
            </div>
            <div className="buttons-row display--flex">
              <Button onClick={ this.onNewGameClick }>
                  { this.state.isPublic ? 'Join Public Game' : 'New Game' }
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default New
