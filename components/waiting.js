import RoughNotation from './ui/rough-notation'
import Logo from './logo'
import GameOverviewNav from './game-overview-nav'
import { getPlayersReadyMap } from '../lib/util'

export default class Starting extends React.Component {

  render() {
    const { gameState, viewer } = this.props
    const playersReadyMap = getPlayersReadyMap(gameState)

    return (
      <div className="content-container">
        <div className="nav">
          <Logo />
          <GameOverviewNav {...this.props} />
        </div>
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
        </div>
      </div>
    )
  }
}
