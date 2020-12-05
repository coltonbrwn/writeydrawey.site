import copy from 'copy-to-clipboard'
import Button from './button'
import { MIN_NUM_PLAYERS } from '../backend/constants'
import { nextRound } from '../lib/api'
import { baseUrlFrontend } from '../lib/util'

export default class GameStartingPlayerList extends React.Component {

    constructor() {
        super()
        this.state = {
            isCopied: false
        }
    }

    onStartClick = async () => {
        const gameState = await nextRound({
            gameId: this.props.gameState.id,
            round: 0
        })
        this.props.onUpdateState(gameState)
    }

    onCopyClick = () => {
        if (this.state.isCopied) {
            return;
        }
        copy(`http://${ baseUrlFrontend() }/${ this.props.gameState.id }`)
        this.setState({
            isCopied: true
        })
    }

    render() {

        const playerList = [...this.props.gameState.players]
        while (playerList.length < MIN_NUM_PLAYERS) {
            playerList.push({})
        }

        return (
            <div className="join flex-container">
                <div className="input-container">
                    {
                        playerList.map( (player, i) => (
                            <div className="input-container-flex" key={ player.playerId }>
                                <h3 className="mono input-label">{ i+1 }.</h3>
                                <span className="input-wrapper">
                                <input className="text--left" disabled value={ player.playerName } />
                                </span>
                            </div>
                        ))
                    }
                    <div className="subtext">
                        need { MIN_NUM_PLAYERS } or more players to start
                    </div>
                    <div className="buttons-row display--flex">
                        <Button onClick={ this.onCopyClick }>
                            {
                                this.state.isCopied
                                    ? 'Copied!'
                                    : 'Copy Game Link'
                            }
                        </Button>
                        <Button
                            onClick={ this.onStartClick }
                            disabled={ this.props.gameState.players.length < MIN_NUM_PLAYERS }
                        >
                            Start Game
                        </Button>
                    </div>
                </div> 
            </div>
        )
    }
}
