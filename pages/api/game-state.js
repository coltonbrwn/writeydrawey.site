import { parseCookie, sortByTimestamp } from '../../lib/util'
import backendGetState from '../../backend/get-state'

export default async function getState(req, res) {
  const userId = parseCookie(req)
  if (!req.query.id) {
    res.status(400).json({})
  }

  const { Item: gameState } = await backendGetState({ id: req.query.id })

  if (!gameState) {
    res.status(404).json({})
    return;
  }


  const transformedGameState =  {
    admin: gameState.admin,
    id: gameState.id,
    options: {
      rounds: gameState.players.length,
      ...gameState.options
    },
    players: sortByTimestamp( gameState.players ),
    playerInput: sortByTimestamp( gameState.playerInput ),
    round: gameState.round,
    timers: gameState.timers,
    state: gameState.state
  };

  res.status(200).json({
    gameState: transformedGameState,
    viewer: {
      userId
    }
  });
}
