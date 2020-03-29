import axios from 'axios';
import { BASE_URL } from './util';

export const createNewGame = async () => {
  try {
    const res = await axios.post(
      `${ BASE_URL }/api/`, {
        method: 'createGame'
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}
