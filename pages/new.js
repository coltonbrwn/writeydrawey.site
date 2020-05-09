import Layout from '../components/layout'
import Nav from '../components/nav'
import * as api from '../lib/api'
import copy from 'copy-to-clipboard'

import "../styles/styles.scss"

export const baseUrl = () => process.env.NODE_ENV === 'development'
  ? "localhost:3030"
  : "writeydrawey.site"

class New extends React.Component {

  constructor() {
    super();
    this.state = {
      isCopied: false,
      newGameId: null
    }
  }

  onNewGameClick = async () => {
    let id;
    try {
      const {response:{id}} = await api.createNewGame();
      this.setState({
        newGameId: id
      })
    } catch (err) {
      console.log(err)
    }
  }

  onJoinGameClick = () => {
    document.location = `http://${ baseUrl() }/${ this.state.newGameId }`
  }

  onCopyClick = () => {
    if (this.state.isCopied) {
      return;
    }
    copy(`http://${ baseUrl() }/${ this.state.newGameId }`, {
      onCopy: this.setState({
        isCopied: true
      })
    })
  }

  render() {
    return (
      <Layout theme="light">
        <div className="full-height">
          <Nav noHome />
          <div className="new-game flex-container">
            {
              this.state.newGameId ? (
                <div>
                  <h3>{`${ baseUrl() }/${ this.state.newGameId }`}</h3>
                  <div>
                    <button onClick={ this.onCopyClick }>
                      <span>
                        { this.state.isCopied ? 'Copied!' : 'Copy Link' }
                      </span>
                    </button>
                    <button onClick={ this.onJoinGameClick }>
                      <span>
                        Join Game
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={ this.onNewGameClick } >
                  <span>New Game</span>
                </button>
              )
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default New
