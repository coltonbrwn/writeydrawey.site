import axios from 'axios';
var shortid = require('shortid');

import { API_METHODS } from '../backend/constants';
const unpackApiResponse = ({ data: { response: { Attributes: newGameState } } }) => newGameState

export const baseUrl = () => process.env.NODE_ENV === 'development'
  ? "http://localhost:3030/api"
  : "https://writeydrawey.site/api"

export const getGameState = ({ gameId }, req) => {
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
  return axios.get(`${ baseUrl() }/game-state?id=${ gameId }`, options)
    .then( res => res.data )
}

export const createNewGame = ({ options }) =>
  axios.post(
    `${ baseUrl() }/update-state`, {
      method: API_METHODS.CREATE_GAME,
      payload: {
        options
      }
    }
  ).then( res => res.data )


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

export const startGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.START_GAME,
    payload: {
      gameId
    }
  }).then(unpackApiResponse)
}

export const endGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.END_GAME,
    payload: {
      gameId
    }
  }).then(unpackApiResponse)
}
