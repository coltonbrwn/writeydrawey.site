import axios from 'axios';
var shortid = require('shortid');

import { API_METHODS } from '../backend/constants';

export const baseUrl = () => process.env.NODE_ENV === 'development'
  ? "http://localhost:3030/api"
  : "https://writeydrawey.site/api"

export const getGameState = ({ gameId }, req) => {
  if (!shortid.isValid(gameId)) {
    return Promise.reject(`Invalid gameId: ${ gameId }`);
  }
  let options;
  if (req) {
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

export const createNewGame = () =>
  axios.post(
    `${ baseUrl() }/update-state`, {
      method: API_METHODS.CREATE_GAME
    }
  ).then( res => res.data )


export const nextRound = ({ gameId, round }) =>
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.NEXT_ROUND,
    payload: {
      gameId,
      round
    }
  })

export const addPlayer = ({ player, gameId }) =>
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.ADD_PLAYER,
    payload: {
      player,
      gameId
    }
  })

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
  })

export const startGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.START_GAME,
    payload: {
      gameId
    }
  })
}

export const endGame = ({ gameId }) => {
  axios.post(`${ baseUrl() }/update-state`, {
    method: API_METHODS.END_GAME,
    payload: {
      gameId
    }
  })
}
