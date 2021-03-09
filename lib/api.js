import axios from 'axios'
var shortid = require('shortid')

import { API_METHODS } from './constants'
const unpackApiResponse = ({data: { gameState }}) => gameState

export const baseUrl = () => {
  let _process = typeof window === 'undefined' ? process : window.process 
  return _process.env.node_env === 'dev'
    ? "http://localhost:3030/api"
    : `${ process.env.VERCEL_URL }/api`
}
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
  const res = await axios.get(`${baseUrl()}/game-state?id=${gameId}`, options)
  return res.data
}

export const createNewGame = ({ options }) =>
  axios.post(
    `${ baseUrl() }/update-state`, {
      method: API_METHODS.CREATE_GAME,
      payload: {
        options
      }
    }
  ).then(unpackApiResponse)


export const nextRound = ({ gameId, round }) =>
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.NEXT_ROUND,
    payload: {
      gameId,
      round
    }
  }).then(unpackApiResponse)

export const addPlayer = ({ player, gameId }) =>
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.ADD_PLAYER,
    payload: {
      player,
      gameId
    }
  }).then(unpackApiResponse)

export const setTimer = ({ gameId, round }) =>
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.SET_TIMER,
    payload: {
      gameId,
      round
    }
  }).then(unpackApiResponse)

export const playerInput = ({ playerId, gameId, phrase, drawing, round }) =>
  axios.post(`${ baseUrl() }/update-state`, {
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
  const result_1 = await axios.post(`${baseUrl()}/update-state`, {
    method: API_METHODS.END_GAME,
    payload: {
      gameId
    }
  })
  return unpackApiResponse(result_1)
}

export const findPublicGame = async ({ options }) => {
  const result_1 = await axios.post(`${baseUrl()}/update-state`, {
    method: API_METHODS.FIND_PUBLIC_GAME,
    payload: {
      options
    }
  })
  return unpackApiResponse(result_1)
}

export const getGallery = async (args={}) => {
  const { offsetKey="" } = args
  const res = await axios.get(`${ baseUrl() }/gallery?offsetKey=${ offsetKey }`)
  return res.data
}