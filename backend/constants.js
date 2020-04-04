module.exports.GAME_STATE = {
  STARTING: 'starting',
  PLAYING: 'playing',
  ROUND_OVER: 'round-over',
  PLAYING: 'playing',
  DONE: 'done'
}

module.exports.TABLES = {
  GAMES: 'writey-drawey-games'
}

module.exports.API_METHODS = {
  CREATE_GAME: 'createGame',
  ADD_PLAYER: 'addPlayer',
  START_GAME: 'startGame',
  PLAYER_INPUT: 'playerInput'
}

module.exports.INITIAL_STATE = {
  id: null,
  players: [],
  playerInput: [],
  round: 0
}
