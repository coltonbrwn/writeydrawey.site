import { get } from 'dotty'
import axios from 'axios'

import { baseUrlBackend, parseCookie } from '../../lib/util'

export default function getState(req, res) {
  if (!req.query.id) {
    return Promise.reject(`Invalid gameId`)
  }
  let setCookie, userId = parseCookie(req)
  const url = `${ baseUrlBackend() }/state?id=${ req.query.id }`
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
