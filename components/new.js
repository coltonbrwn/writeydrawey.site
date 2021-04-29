import Toggle from 'react-toggle'

import Layout from './layout'
import PlayerNav from './nav/player-nav'
import Button from './ui/button'
import Input from './ui/input'

import * as api from '../lib/api'
import { TURN_LIMIT } from '../lib/constants'
import { appUrl, formatTime } from '../lib/util'

class New extends React.Component {

  constructor(props) {
    super();
    this.state = {
      playerName: '',
      phrase: '',
      timeLimit: false,
      isPublic: props.isPublic
    }
  }

  static getInitialProps({ req, query }) {
    return {
      isPublic: Boolean(query.public)
    }
  }

  onNewGameClick = async () => {
    if (!this.state.playerName || !this.state.phrase) {
      return
    }

    let gameId;
    if (this.state.isPublic) {
      const { gameState: { id } } = await api.findPublicGame({
        isPublic: this.state.isPublic,
        options: {
          time_limit: this.state.timeLimit
        }
      })
      gameId = id
    } else {
      const { gameState: { id } } = await api.createNewGame({
        isPublic: this.state.isPublic,
        options: {
          time_limit: this.state.timeLimit
        }
      });
      gameId = id
    }
    await this.addPlayerToGame({ id: gameId })
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
      <Layout theme="light" subtitle="New Game">
        <PlayerNav />
        <div className="join flex-container full-height">
          <div className="input-container">
            <Input
              label="your name"
              onChange={  this.onNameInputChange }
              lineType={ 1 }
              mobileCollapse
            />
            <Input
              label="a phrase"
              onChange={  this.onPhraseInputChange }
              lineType={ 2 }
              placeholder="~ whatever comes to mind   "
              mobileCollapse
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
