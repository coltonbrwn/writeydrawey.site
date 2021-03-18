import dedupe from 'dedupe'

import { parseCookie, sortByTimestamp, now } from '../../lib/util'
import getGameState from '../../backend/get-state'
import { getGamePlayerActivity, updatePlayerActivity } from '../../backend/player-activity'
import { MAX_PLAYER_IDLE_MS } from '../../lib/constants'

export default async function getState(req, res) {
  const userId = parseCookie(req)
  const gameId = req.query.id
  if (!gameId) {
    res.status(400).json({})
  }

  const results = await Promise.allSettled([
    updatePlayerActivity({ gameId, playerId: userId }),
    getGamePlayerActivity({ gameId }),
    getGameState({ id: gameId })
  ])

  const { value: { Items: playerActivity }} = results[1]
  const { value: { Item: gameState }} = results[2]

  if (!gameState) {
    res.status(404).json({})
    return;
  }

  const playerLastSeenMap = playerActivity.reduce((acc, val) => {
    acc[val.id] = now() - val.lastSeen
    return acc
  }, { [userId]: now() })
  const activePlayers = gameState.players.filter(
    player => playerLastSeenMap[player.playerId] < MAX_PLAYER_IDLE_MS
  )

  const transformedGameState =  {
    admin: gameState.admin,
    id: gameState.id,
    options: {
      rounds: gameState.players.length,
      ...gameState.options
    },
    players: dedupe(sortByTimestamp(activePlayers), p => p.playerId ),
    eligiblePlayers: sortByTimestamp( gameState.players),
    playerInput: sortByTimestamp( gameState.playerInput ),
    round: gameState.round,
    timers: gameState.timers,
    state: gameState.state,
    isPublic: Boolean(gameState.isPublic),
    playerLastSeenMap
  };

  res.status(200).json({
    gameState: transformedGameState,
    viewer: {
      userId
    }
  });
}
