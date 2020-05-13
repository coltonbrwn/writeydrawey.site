import Nav from './nav';
import createCardStacks from '../lib/create-card-stacks';

export default class Home extends React.Component {

  render() {
    const cardStacks = createCardStacks(this.props.gameState)
    const playerNames = this.props.gameState.players.reduce((acc, val) => {
      acc[ val.playerId ] = val.playerName
      return acc
    }, {})

    return (
      <div className="game-over content-container">
        <Nav textOverride="game over!"/>
        <div className="full-height center">
          {
            cardStacks.map( c => (
              <div key={ c.player.playerId }>
                {
                  c.cards.map( (input, i) => (
                    input.phrase ? (
                      i == 0
                        ? (
                          <div className="game-over--section" key={ input.ts } >
                            <h2>"{ input.phrase }"</h2>
                            <div className="italic">--{ c.player.playerName }</div>
                          </div>
                        ) : (
                          <div className="game-over--section" key={ input.ts } >
                            <h3 title={ playerNames[input.playerId] }>
                              "{ input.phrase }"
                            </h3>
                          </div>
                        )
                    ) : (
                      <div className="game-over--section" key={ input.ts } >
                        <img
                          title={ playerNames[input.playerId] }
                          src={input.drawing }
                        />
                      </div>
                    )
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
