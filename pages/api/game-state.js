import dedupe from 'dedupe'
import { get } from 'dotty'

import { parseCookie, sortByTimestamp, now } from '../../lib/util'
import getGameState from '../../backend/get-state'
import { getGamePlayerActivity, updatePlayerActivity } from '../../backend/player-activity'
import { MAX_PLAYER_IDLE_MS, GAME_STATE } from '../../lib/constants'

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

  /*
    Build a cached lookup table for player activity
   */
  const playerLastSeenMap = playerActivity.reduce((acc, val) => {
    acc[val.id] = val.lastSeen
    return acc
  }, { [userId]: now() })

  /*
    Find the active players. 
    Filter people out who haven't polled the server in N ms.
   */
  const activePendingPlayers = gameState.pendingPlayers.filter(
    player => (now() - playerLastSeenMap[player.playerId]) < MAX_PLAYER_IDLE_MS
  )

  const admin = gameState.isPublic 
    ? get(activePendingPlayers, `${ 0 }.playerId`)
    : gameState.admin

  const transformedGameState =  {
    admin,
    id: gameState.id,
    options: {
      rounds: gameState.players.length,
      ...gameState.options
    },
    players: sortByTimestamp(gameState.players),
    pendingPlayers: dedupe(sortByTimestamp(activePendingPlayers), p => p.playerId ),
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
