import axios from 'axios';
var shortid = require('shortid');

import { API_METHODS } from '../backend/constants';

export const baseUrl = () => process.env.NODE_ENV === 'development'
  ? "http://localhost:3030"
  : "https://5093s0prz8.execute-api.us-east-1.amazonaws.com/dev"

export const getGameState = ({ gameId }) => {
  if (!shortid.isValid(gameId)) {
    return Promise.reject(`Invalid gameId: ${ gameId }`);
  }
  return axios.get(`http://localhost:3030/api/game-state?id=${ gameId }`, {
    withCredentials: true
  })
  .then( res => res.data )
}

export const createNewGame = () =>
  axios.post(
    `${ baseUrl() }/api/update-state`, {
      method: API_METHODS.CREATE_GAME
    }
  ).then( res => res.data )


export const nextRound = ({ gameId, round }) =>
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.NEXT_ROUND,
    payload: {
      gameId,
      round
    }
  })

export const addPlayer = ({ player, gameId }) =>
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.ADD_PLAYER,
    payload: {
      player,
      gameId
    }
  })

export const playerInput = ({ playerId, gameId, phrase, drawing, round }) =>
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.PLAYER_INPUT,
    payload: {
      playerId,
      gameId,
      phrase,
      drawing,
      round
    }
  })

export const startGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.START_GAME,
    payload: {
      gameId
    }
  })
}

export const endGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.END_GAME,
    payload: {
      gameId
    }
  })
}
