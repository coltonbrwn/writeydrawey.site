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

module.exports.appUrl = () =>
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? "http://localhost:3030"
    : `https://${ process.env.NEXT_PUBLIC_VERCEL_URL }`
  
module.exports.parseCookie = req => {
  if (!req || !req.headers || !req.headers.cookie) {
    return
  }
  return get(cookie.parse(req.headers.cookie), 'cookiedrawey')
}

/*
  {
    playerId: bool,
    playerId: bool
  }
 */
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

module.exports.sortByTimestamp = array => {
  if (!Array.isArray(array)) {
    return array;
  }
  return array.sort((a, b) => (
    b.ts - a.ts
  ))
}

module.exports.now = () => new Date().getTime()