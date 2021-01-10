const emptyCard = {
  phrase: '',
  drawing: '',
  playerName: '',
  playerId: '',
  ts: '',
}

export default function(gameState) {
  /*
    Loops through the game state and creates a stack of responses
    that tracks the logical progression of the game
   */
  const playerIds = gameState.players.map( p => p.playerId )
  const cardStacks = gameState.players.map( (player, i) => {
    const cards = [];
    let j = i;
    for (var round = 0; round <= gameState.round; round++) {
      const playerId = playerIds[ j ]
      const card = gameState.playerInput.find( input => (
        input.round === round && input.playerId === playerId
      ))
      cards.push( card || emptyCard )
      j = (j >= playerIds.length - 1) ? 0 : j + 1;
    }
    return {
      player,
      cards
    }
  })

  return cardStacks;
}
