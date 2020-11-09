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
  NEXT_ROUND: 'nextRound'
}

module.exports.GAME_QUEUE = {
  URL: 'https://sqs.us-east-1.amazonaws.com/680198729557/wd-games',
  TOPIC: 'gameComplete'
}

module.exports.INITIAL_STATE = {
  id: null,
  state: null,
  players: [],
  playerInput: [],
  round: 0,
}
