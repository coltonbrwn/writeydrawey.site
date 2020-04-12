export default function(gameState) {
  /*
    Loops through the game state and creates a stack of responses
    that tracks the logical progression from each player's first entry
   */
  const playerIds = gameState.players.map( p => p.playerId )
  const cardStacks = gameState.players.map( (player, i) => {
    const cards = [];
    let j = i;
    for (var round = 0; round <= gameState.round; round++) {
      const playerId = playerIds[ j ]
      cards.push( gameState.playerInput.find( input => (
        input.round === round && input.playerId === playerId
      )))
      j = (j >= playerIds.length - 1) ? 0 : j + 1;
    }
    return {
      player,
      cards
    }
  })

  return cardStacks;
}
