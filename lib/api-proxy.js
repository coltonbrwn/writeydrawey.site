import { get } from 'dotty'
import cookie from 'cookie'
import { v4 } from 'uuid'
import axios from 'axios'

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

  let cookiedrawey;
  try {
    cookiedrawey = cookie.parse(req.headers.cookie)['cookiedrawey'];
  } catch (e) {
    cookiedrawey = v4();
  }
  const setCookie = cookie.serialize('cookiedrawey', cookiedrawey, {
    maxAge: 9999
  })

  const url = `${ baseUrl() }/state?id=${ req.query.id }`;
  return axios.get(url)
    .then( response => {
      res.setHeader('Set-Cookie', setCookie)
      res.status(response.status).json({
        gameState: response.data,
        viewer: {
          userId: cookiedrawey
        }
      });
    })
    .catch( err => {
      console.log(err)
      res.status(get(err, 'response.status') || 500).end()
    })
}
