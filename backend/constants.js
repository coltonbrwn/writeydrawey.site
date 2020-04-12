module.exports.GAME_STATE = {
  STARTING: 'starting',
  PLAYING: 'playing',
  DONE: 'done'
}

module.exports.TABLES = {
  GAMES: 'writey-drawey-games'
}

module.exports.BUCKETS = {
  IMAGES: 'writey-drawey-images'
}

module.exports.API_METHODS = {
  CREATE_GAME: 'createGame',
  ADD_PLAYER: 'addPlayer',
  START_GAME: 'startGame',
  END_GAME: 'endGame',
  PLAYER_INPUT: 'playerInput',
  NEXT_ROUND: 'nextRound'
}

module.exports.INITIAL_STATE = {
  id: null,
  state: null,
  players: [],
  playerInput: [],
  round: 0,
}
