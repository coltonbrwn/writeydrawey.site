import axios from 'axios'
var shortid = require('shortid')

import { API_METHODS } from './constants'
import { appUrl } from './util'
const unpackApiResponse = ({data: { gameState }}) => gameState

export const getGameState = async ({ gameId }, req) => {

  if (!shortid.isValid(gameId)) {
    return Promise.reject(`Invalid gameId: ${ gameId }`);
  }
  let options;
  if (req && req.headers.cookie) {
    options = {
      headers: {  
        'Cookie': req.headers.cookie
      }
    }
  } else {
    options = {
      withCredentials: true,
    }
  }
  const res = await axios.get(`${appUrl()}/api/game-state?id=${gameId}`, options)
  return res.data
}

export const createNewGame = ({ options }) =>
  axios.post(
    `${ appUrl() }/api/update-state`, {
      method: API_METHODS.CREATE_GAME,
      payload: {
        options
      }
    }
  ).then(unpackApiResponse)

export const startGame = ({ gameId, players }) =>
  axios.post(`${ appUrl() }/api/update-state`, {
    method: API_METHODS.START_GAME,
    payload: {
      gameId,
      players
    }
  }).then(unpackApiResponse)

export const nextRound = ({ gameId, round }) =>
  axios.post(`${ appUrl() }/api/update-state`, {
    method: API_METHODS.NEXT_ROUND,
    payload: {
      gameId,
      round
    }
  }).then(unpackApiResponse)

export const addPlayer = ({ player, gameId }) =>
  axios.post(`${ appUrl() }/api/update-state`, {
    method: API_METHODS.ADD_PLAYER,
    payload: {
      player,
      gameId
    }
  }).then(unpackApiResponse)

export const setTimer = ({ gameId, round }) =>
  axios.post(`${ appUrl() }/api/update-state`, {
    method: API_METHODS.SET_TIMER,
    payload: {
      gameId,
      round
    }
  }).then(unpackApiResponse)

export const playerInput = ({ playerId, gameId, phrase, drawing, round }) =>
  axios.post(`${ appUrl() }/api/update-state`, {
    method: API_METHODS.PLAYER_INPUT,
    payload: {
      playerId,
      gameId,
      phrase,
      drawing,
      round
    }
  }).then(unpackApiResponse)

export const endGame = async ({ gameId }) => {
  const result = await axios.post(`${appUrl()}/api/update-state`, {
    method: API_METHODS.END_GAME,
    payload: {
      gameId
    }
  })
  return unpackApiResponse(result)
}

export const findPublicGame = async ({ options }) => {
  const result = await axios.post(`${appUrl()}/api/update-state`, {
    method: API_METHODS.FIND_PUBLIC_GAME,
    payload: {
      options
    }
  })
  return unpackApiResponse(result)
}

export const getGallery = async (args={}) => {
  const { offsetKey="" } = args
  const res = await axios.get(`${ appUrl() }/api/gallery?offsetKey=${ offsetKey }`)
  return res.data
}

export const invite = async ({ playerAddress, fromName, gameId }) => {
  const result = await axios.post(`${ appUrl() }/api/invite`, {
    payload: {
      playerAddress,
      fromName,
      gameId
    }
  })
  return result
}