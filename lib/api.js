import axios from 'axios';
import { BASE_URL } from './util';
import { API_METHODS } from '../backend/constants';

export const createNewGame = async () => {
  try {
    const res = await axios.post(
      `${ BASE_URL }/api/`, {
        method: API_METHODS.CREATE_GAME
      }
    );
    return res.data;
  } catch (err) {
    console.log(err)
  }
}

export const getGameState = async ({ gameId }) => {
  try {
    const res = await axios.get(`${ BASE_URL }/state?id=${ gameId }`)
    return res;
  } catch (err) {
    console.log(err);
  }
}
