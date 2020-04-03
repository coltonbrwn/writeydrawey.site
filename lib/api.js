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

export const addPlayer = ({ playerName, gameId }) =>
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.ADD_PLAYER,
    payload: {
      name: playerName,
      photo: 'photo.jpg',
      gameId
    }
  })

export const submitPhrases = ({ player, game, phrases, round }) =>
  axios.post(`${ baseUrl() }/api/`, {
    method: API_METHODS.SUBMIT_PHRASES,
    payload: {
      player,
      game,
      phrases,
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
