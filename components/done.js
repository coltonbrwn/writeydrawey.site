
export default class Home extends React.Component {
  render() {

    /*
      Loops through the game state and creates a stack of responses
      that tracks the logical progression from each player's first entry
     */
    const gameState = this.props.gameState
    const playerIds = gameState.players.map( p => p.playerId )
    const cardStacks = gameState.players.map( (player, i) => {
      const cards = [];
      let j = i;
      for (var round = 0; round <= gameState.round; round++) {
        const playerId = playerIds[ j ]
        cards.push( gameState.playerInput.find( input => (
          input.round === round && input.playerId === playerId
        )))
        j = (j <= 0) ? playerIds.length - 1 : j - 1;
      }
      return {
        player,
        cards
      }
    })

    return (
      <div>
        <h1>Game Over!</h1>
        <h3>Game results below</h3>

        {
          cardStacks.map( c => (
            <div key={ c.player.playerId }>
              <h1 style={{ paddingTop: '4em', fontWeight: 'bold' }}>{ c.player.playerName }</h1>
              {
                c.cards.map( input => (
                  <div>
                    {
                      input.phrase ? (
                        <h3 style={{ padding: '4em 2em' }}>{input.phrase}</h3>
                      ) : (
                        <img src={input.drawing} style={{
                          border: "2px solid var(--black-ln)",
                          width: '50%'
                        }}/>
                      )
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}
