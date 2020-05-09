import { get } from 'dotty'
import cookie from 'cookie'
import { v4 } from 'uuid'
import axios from 'axios'

import { API_METHODS } from '../backend/constants';

const baseUrl = () => process.env.NODE_ENV === 'development'
  ? "http://localhost:3000/dev"
  : "https://5093s0prz8.execute-api.us-east-1.amazonaws.com/dev"

export function getState(req, res) {
  if (!req.query.id) {
    return Promise.reject(`Invalid gameId`)
  }

  /*
    Look for user cookie
  */

  let userId, setCookie;
  try {
    userId = cookie.parse(req.headers.cookie)['cookiedrawey'];
  } catch (e) {
    console.log(e)
  }

  const url = `${ baseUrl() }/state?id=${ req.query.id }`;
  return axios.get(url)
    .then( response => {
      if (setCookie) {
        res.setHeader('Set-Cookie', setCookie)
      }
      res.status(response.status).json({
        gameState: response.data,
        viewer: {
          userId
        }
      });
    })
    .catch( err => {
      console.log(err)
      res.status(get(err, 'response.status') || 500).end()
    })
}



export function updateState(req, res) {

  /*
    Look for or create userId
  */
  let userId = cookie.parse(req.headers.cookie)['cookiedrawey'], setCookie;
  if (!userId && (req.body.method === API_METHODS.CREATE_GAME )) {
    userId = v4();
    setCookie = cookie.serialize('cookiedrawey', userId, {
      maxAge: 9999,
      path: '/'
    })
  } else if (!userId) {
    return res.status(401).send('unauthorized')
  }

  const { method, payload } = req.body;

  return axios.post(`${ baseUrl() }/api`, {
      method,
      payload,
      viewer: {
        userId
      }
    }).then(response => {
      if (setCookie) {
        res.setHeader('Set-Cookie', setCookie)
      }
      res.status(response.status).json({
        response: response.data.response,
        viewer: {
          userId
        }
      })
    })
    .catch( err => {
      console.log(err)
      res.status(get(err, 'response.status') || 500).end()
    })


}
