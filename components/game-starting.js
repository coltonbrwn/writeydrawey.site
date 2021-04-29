import copy from 'copy-to-clipboard'
import validator from 'email-validator';

import Cross from './svg/cross'
import Button from './ui/button'
import Input from './ui/input'
import PlayerNav from './nav/player-nav'
import { MIN_NUM_PLAYERS_PRIVATE, MIN_NUM_PLAYERS_PUBLIC } from '../lib/constants'
import { nextRound, invite } from '../lib/api'
import { appUrl } from '../lib/util'


export default class GameStarting extends React.Component {

    constructor() {
        super()
        this.state = {
            isCopied: false,
            isModalVisible: false,
            email: '',
            hasInvalidEmail: false
        }
    }

    onStartClick = async () => {
        const gameState = await nextRound({
            gameId: this.props.gameState.id,
            round: 0
        })
        this.props.onUpdateState(gameState)
    }

    openModal = () => this.setState({ isModalVisible: true })

    closeModal = () =>  this.setState({ isModalVisible: false })

    onEnterEmail = e => {
        this.setState({
            apiStatusSuccess: null,
            hasInvalidEmail: false,
            email: e.target.value
        })
    }

    onCopyClick = () => {
        if (this.state.isCopied) {
            return;
        }
        copy(`${ appUrl() }/${ this.props.gameState.id }`)
        this.setState({
            isCopied: true
        }, window.setTimeout.bind(null, this.closeModal, 200))
    }

    sendEmail = async ({ adminPlayer }) => {

        const { email } = this.state
        if(!validator.validate(email)) {
            return this.setState({
                hasInvalidEmail: true
            })
        }
        try {
            await invite({
                playerAddress: email,
                fromName: adminPlayer.playerName,
                gameId: this.props.gameState.id
            })
            this.setState({
                apiStatusSuccess: true
            })
        } catch (e) {
            this.setState({
                apiStatusSuccess: false
            })
        }
    }

    render() {
        const { gameState, viewer } = this.props
        const viewerIsAdmin = gameState.admin === viewer.userId
        const adminPlayer = gameState.players.find( player => player.playerId === gameState.admin) || {}
        const numPlayersPresent = gameState.players.length
        const minNumPlayers = gameState.isPublic ?  MIN_NUM_PLAYERS_PUBLIC : MIN_NUM_PLAYERS_PRIVATE
        const numPlayersNeeded =  minNumPlayers - numPlayersPresent
        const playerList = [...gameState.players]
        while (playerList.length < minNumPlayers) {
            playerList.push({})
        }

        return (
            <div className="full-height">
                { this.state.isModalVisible ? (
                    <div className="modal flex-container full-height">
                        <div className="modal__inner">
                            <div className="modal__close" onClick={ this.closeModal }>
                                <Cross />
                            </div>
                            <div className="input-container">
                                <Input
                                    label="game link:"
                                    value={ `${ appUrl() }/${ this.props.gameState.id }` }
                                />
                                <Input
                                    label="email address:"
                                    onChange={ this.onEnterEmail }
                                    hasError={ this.state.hasInvalidEmail }
                                />
                                <div className="buttons-row display--flex">
                                    <Button onClick={ this.onCopyClick }>
                                        { this.state.isCopied ? 'Copied' : 'Copy Link' }
                                    </Button>
                                    <Button onClick={ () => this.sendEmail({ adminPlayer }) }>
                                        invite via email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''}
                <PlayerNav gameState={ gameState } viewer={ viewer } />
                <div className="join flex-container full-height game-starting" >
                    <div className="input-container">
                        {
                            playerList.map( (player, i) => (
                                <Input
                                    key={ player.playerId || i }
                                    label={`${ i+1 }.`}
                                    disabled
                                    value={ player.playerName }
                                />
                            ))
                        }
                        <div className="subtext">
                            {
                                gameState.isPublic ? (
                                    numPlayersPresent < minNumPlayers
                                        ? `need ${ numPlayersNeeded } more player${ numPlayersNeeded < 2 ? '' : 's' } and the game will start automatically`
                                        : `game starting...`
                                ) : (
                                    numPlayersPresent < minNumPlayers
                                        ? `need ${ numPlayersNeeded } more player${ numPlayersNeeded < 2 ? '' : 's' } to start`
                                        : `ready to start!`
                                )
                            }
                        </div>
                        <div className="buttons-row display--flex">
                            <Button onClick={ this.openModal }>
                                Invite Players
                            </Button>
                            <Button
                                className="start-game-button"
                                onClick={ this.onStartClick }
                                disabled={ (this.props.gameState.players.length < minNumPlayers) || !viewerIsAdmin || gameState.isPublic }
                                tooltip={ (viewerIsAdmin || gameState.isPublic) ? '' : `only the host (${ adminPlayer.playerName }) can start the game` }
                            >
                                Start Game
                            </Button>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
