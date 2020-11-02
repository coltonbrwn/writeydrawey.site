module.exports.GAME_STATE = {
  STARTING: 'starting',
  PLAYING: 'playing',
  DONE: 'done'
}

module.exports.TABLES = {
  GAMES: 'writey_drawey_dev'
}

module.exports.BUCKETS = {
  IMAGES: 'writey-drawey-images-dev'
}

module.exports.API_METHODS = {
  CREATE_GAME: 'createGame',
  ADD_PLAYER: 'addPlayer',
  START_GAME: 'startGame',
  END_GAME: 'endGame',
  PLAYER_INPUT: 'playerInput',
  PLAYER_INPUT_START_TIMER: 'playerInputStartTimer',
  NEXT_ROUND: 'nextRound'
}

module.exports.DEFAULT_TURN_DELAY = 5000;
module.exports.TURN_LIMIT = 60000;

module.exports.INITIAL_STATE = {
  id: null,
  state: null,
  options: {
    time_limit: 0
  },
  players: [],
  playerInput: [],
  round: 0,
  timers: []
}
