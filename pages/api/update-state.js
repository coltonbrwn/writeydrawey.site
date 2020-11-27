import { get } from 'dotty'
import cookie from 'cookie'
import { v4 } from 'uuid'
import axios from 'axios'

import { baseUrlBackend, parseCookie } from '../../lib/util'
import { API_METHODS } from '../../backend/constants'

function updateState(req, res) {

  /*
    Look for or create userId
  */
  let setCookie, userId = parseCookie(req);
  switch (req.body.method) {
    case API_METHODS.CREATE_GAME:
    case API_METHODS.ADD_PLAYER:
      // can create new user tokens here
      if (!userId) {
        userId = v4();
      }
      setCookie = cookie.serialize('cookiedrawey', userId, {
        maxAge: 9999,
        path: '/'
      })
      break;
    default:
      if (!userId) {
        return res.status(401).send('unauthorized')
      }
  }

  const { method, payload } = req.body;

  return axios.post(`${ baseUrlBackend() }/api`, {
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

export default (req, res) => {
  updateState(req, res);
}
