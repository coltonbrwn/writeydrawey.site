import { GAME_STATE, TURN_LIMIT, MIN_NUM_PLAYERS_PRIVATE, MIN_NUM_PLAYERS_PUBLIC } from "../../lib/constants"
import { formatTime } from '../../lib/util'
import TurnTimer from '../ui/turn-timer'
import Link from 'next/link'
import Button from '../ui/button'

export default ({ gameState, viewer, playerHasContributed }) => {
    let timeLimitText, roundText, roundTitle;
    const playerTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === viewer.userId)
    const minNumPlayers = gameState.isPublic ?  MIN_NUM_PLAYERS_PUBLIC : MIN_NUM_PLAYERS_PRIVATE

    if (gameState.state === GAME_STATE.DONE) {
        return (
            <div>
                <Link href="/new">
                    <a>
                        <Button type={ 1 }>
                            Play Again
                        </Button>
                    </a>
                </Link>
            </div>
        )
    }

    /* 
        Build text to display the status of the timer
    */
    if (playerTimer && !playerHasContributed && playerTimer.end > new Date().getTime()) {
        timeLimitText = <TurnTimer timer={ playerTimer } />
    } else {
        timeLimitText = gameState.options.time_limit
            ? formatTime( TURN_LIMIT / 1000)
            : 'none'
    }

    /*
        Build text to display the current round
    */
    if (gameState.state === GAME_STATE.STARTING) {
        roundTitle = 'rounds'
        roundText = gameState.players.length <= minNumPlayers ? minNumPlayers : gameState.players.length
    } else {
        roundTitle = 'round'
        roundText = `${ gameState.round } / ${ gameState.players.length }`
    }

    return (
        <div className="game-overview-nav">
            <div hidden={ !gameState.options.time_limit }>
                <span>time limit: </span>
                <span>{ timeLimitText }</span>
            </div>
            <div>
                <span>{ roundTitle }: </span>   
                <span>{ roundText }</span>
            </div>
        </div>
    )
}