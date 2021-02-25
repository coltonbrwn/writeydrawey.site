import copy from 'copy-to-clipboard'
import Button from './ui/button'
import Input from './ui/input'
import { MIN_NUM_PLAYERS } from '../lib/constants'
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
        copy(`https://${ baseUrlFrontend() }/${ this.props.gameState.id }`)
        this.setState({
            isCopied: true
        })
    }

    render() {

        const numPlayersPresent = this.props.gameState.players.length
        const numPlayersNeeded =  MIN_NUM_PLAYERS - numPlayersPresent
        const playerList = [...this.props.gameState.players]
        while (playerList.length < MIN_NUM_PLAYERS) {
            playerList.push({})
        }

        return (
            <div className="join flex-container full-height">
                <div className="input-container">
                    {
                        playerList.map( (player, i) => (
                            <Input
                                key={ player.playerId || i}
                                label={`${ i+1 }.`}
                                disabled
                                value={ player.playerName }
                            />
                        ))
                    }
                    <div className="subtext">
                        {
                            numPlayersPresent < MIN_NUM_PLAYERS
                                ? `need ${ numPlayersNeeded } more player${ numPlayersNeeded < 2 ? '' : 's' } to start`
                                : `ready to start!`
                        }
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
