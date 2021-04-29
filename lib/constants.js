module.exports.GAME_STATE = {
  STARTING: 'starting',
  PLAYING: 'playing',
  DONE: 'done'
}

module.exports.SOCIALS = {
  replyLink: "https://rep.ly/writey_drawey",
  myTwitter: "https://twitter.com/coltontbrown",
  wdTwitter: "https://twitter.com/writey_drawey",
  mediumLink: "https://rep.ly/writey_drawey",
  roughNotationLink: "https://roughnotation.com/",
  paperLink: "http://paperjs.org/",
  relativeLink: "https://www.colophon-foundry.org/typefaces/relative/",
  githubLink: "https://github.com/coltonTB/writeydrawey.site",
  email: "mailto:mail@writeydrawey.site",
  discordServer: "https://discord.gg/9zUst8tgU5"
}

module.exports.TABLES = {
  ACTIVE_PLAYERS: 'writey-drawey-active-players',
  ACTIVE_PLAYERS_DEV: 'writey-drawey-active-players-dev',
  GAMES: 'writey-drawey-games',
  GAMES_DEV: 'writey_drawey_dev'
}

module.exports.BUCKETS = {
  IMAGES: 'writey-drawey-images',
  IMAGES_DEV: 'writey-drawey-images-dev',
  ARCHIVE: 'writey-drawey-archive',
  ARCHIVE_DEV: 'writey-drawey-archive-dev',
}

module.exports.API_METHODS = {
  CREATE_GAME: 'createGame',
  ADD_PLAYER: 'addPlayer',
  START_GAME: 'startGame',
  END_GAME: 'endGame',
  PLAYER_INPUT: 'playerInput',
  SET_TIMER: 'setTimer',
  NEXT_ROUND: 'nextRound',
  FIND_PUBLIC_GAME: 'findGame',
}

module.exports.DEFAULT_TURN_DELAY = 10000;
module.exports.TURN_LIMIT = 60000;
module.exports.MIN_NUM_PLAYERS_PRIVATE = 3; 
module.exports.MIN_NUM_PLAYERS_PUBLIC = 3; 
module.exports.MAX_PLAYER_IDLE_MS = 1000 * 10; 
module.exports.PUBLIC_GAME_STALE_TIMEOUT = 1000 * 60 * 60 * 12; 

module.exports.INITIAL_STATE = {
  id: null,
  state: null,
  options: {
    time_limit: false
  },
  players: [],
  pendingPlayers: [],
  playerInput: [],
  round: 0,
  timers: [],
  admin: null
}

module.exports.EMPTY_VIEWER = {
  userId: null
}