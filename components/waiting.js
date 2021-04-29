import PlayerNav from './nav/player-nav'
import RoughNotation from './ui/rough-notation'
import TurnTimer from './ui/turn-timer'
import { getPlayersReadyMap } from '../lib/util'

export default class Waiting extends React.Component {

  render() {
    const { gameState, viewer } = this.props
    const playersReadyMap = getPlayersReadyMap(gameState)
    const roundTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === '0')
    const hasValidTimer = roundTimer && roundTimer.end > new Date().getTime()

    return (
      <div className="waiting">
        <PlayerNav gameState={ gameState } viewer={ viewer } />
        <div className="waiting flex-container full-height">
          <div className="players">
            {
              this.props.gameState.players
                .map( p => (
                  <div className="rough-notation-wrapper">
                    <RoughNotation
                      className="TEST"
                      style="strike-through"
                      toggle={ playersReadyMap[ p.playerId ]}
                      key={ p.playerId + playersReadyMap[p.playerId ]}
                    >
                      <h3>
                          { p.playerName }
                      </h3>
                    </RoughNotation>
                  </div>
                ))
            }
          </div>
          {
            hasValidTimer && (
              <h2 className="waiting__next-round-timer">
                Next round in <TurnTimer timer={ roundTimer } />
              </h2>
            )
          }
        </div>
      </div>
    )
  }
}
