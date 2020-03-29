import axios from 'axios';
import { BASE_URL } from './util';
import { API_METHODS } from '../backend/constants';

export const createNewGame = () =>
  axios.post(
    `${ BASE_URL }/api/`, {
      method: API_METHODS.CREATE_GAME
    }
  ).then( res => res.data )

export const getGameState = ({ gameId }) =>
  axios.get(`${ BASE_URL }/state?id=${ gameId }`)
    .then( res => res.data )

export const createNewPlayer = ({ playerName }) =>
  axios.post(`${ BASE_URL }/api/`, {
    method: API_METHODS.CREATE_PLAYER,
    payload: {
      name: playerName,
      photo: 'photo.jpg'
    }
  })

export const submitPhrases = ({ player, game, phrases }) =>
  axios.post(`${ BASE_URL }/api/`, {
    method: API_METHODS.SUBMIT_PHRASES,
    payload: {
      player,
      game,
      phrases
    }
  })
