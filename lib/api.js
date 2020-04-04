import axios from 'axios';

import { API_METHODS } from '../backend/constants';

export const baseUrl = () => /localhost/.test(window.location.origin)
  ? "http://localhost:3000/dev"
  : "https://5093s0prz8.execute-api.us-east-1.amazonaws.com/dev"

export const createNewGame = () =>
  axios.post(
    `${ baseUrl() }/api/`, {
      method: API_METHODS.CREATE_GAME
    }
  ).then( res => res.data )

export const getGameState = ({ gameId }) =>
  axios.get(`${ baseUrl() }/state?id=${ gameId }`)
    .then( res => res.data )

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
