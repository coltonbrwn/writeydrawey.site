import { get } from 'dotty'
import cookie from 'cookie'

export const THEME_LIGHT = 'light';

export const COLORS = {
  [THEME_LIGHT]: {
    black: '#444',
    white: '#FFF',
    lightgray: '#f7f7f7',
    gray: '#bbb'
  }
}

module.exports.formatTime = seconds => {
  if (seconds === null) {
    return ''
  }
  let m = Math.floor(seconds / 60)
  let s = (seconds < 1) ? seconds : seconds
  s = Math.abs(s % 60)
  s = s < 10 ? `0${ s }` : s
  return `${ m }:${ s }`
}

module.exports.baseUrlFrontend = () =>
  process.env.NODE_ENV === 'development'
    ? "localhost:3030"
    : ""

module.exports.baseUrlBackend = () =>
  process.env.NODE_ENV === 'development'
    ? "http://localhost:3000/dev"
    : "https://5093s0prz8.execute-api.us-east-1.amazonaws.com/dev"
  
module.exports.parseCookie = req => {
  if (!req || !req.headers || !req.headers.cookie) {
    return
  }
  return get(cookie.parse(req.headers.cookie), 'cookiedrawey')
}

module.exports.getPlayersReadyMap = gameState => {
  let playersReadyMap = {}
  gameState.players.forEach( p => {
    const isPlayerReady = gameState.playerInput.find( item => (
      item.playerId === p.playerId && item.round === gameState.round
    ))
    playersReadyMap[ p.playerId ] = isPlayerReady
  })
  return playersReadyMap
}

module.exports.areAllPlayersReady = gameState => {
  const playersReadyMap = module.exports.getPlayersReadyMap( gameState )
  const numPlayersReady =  Object.values(playersReadyMap).reduce((a, v) => a + (v ? 1 : 0), 0)
  return numPlayersReady === gameState.players.length
}

module.exports.isGameOver = gameState => {
  return module.exports.areAllPlayersReady(gameState) && gameState.round >= gameState.players.length
}