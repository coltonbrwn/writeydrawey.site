import Toggle from 'react-toggle'

import Layout from './layout'
import Logo from './logo'
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

  onSubmit = async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }
    const { gameState: { id } } = await api.createNewGame({
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
        <div className="content-container ctr-adjust-pad">
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
              <Button onClick={ this.onSubmit }>
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
