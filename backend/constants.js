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
  SET_TIMER: 'setTimer',
  NEXT_ROUND: 'nextRound'
}

module.exports.DEFAULT_TURN_DELAY = 5000;
module.exports.TURN_LIMIT = 10000;
module.exports.MIN_NUM_PLAYERS = 2; 

module.exports.INITIAL_STATE = {
  id: null,
  state: null,
  options: {
    time_limit: false
  },
  players: [],
  playerInput: [],
  round: 0,
  timers: []
}
