import cookie from 'cookie'
import { v4 } from 'uuid'
import updateGameState from '../../backend/update-state'

import { parseCookie } from '../../lib/util'
import { API_METHODS } from '../../lib/constants'

export default async function updateState(req, res) {

  /*
    Look for or create userId
  */
  let userId = parseCookie(req);
  switch (req.body.method) {
    case API_METHODS.CREATE_GAME:
    case API_METHODS.FIND_PUBLIC_GAME:
    case API_METHODS.ADD_PLAYER:
      // can create new user tokens here
      if (!userId) {
        userId = v4();
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('cookiedrawey', userId, {
            maxAge: 99999999,
            path: '/'
          })
        )
      }
      break;
    default:
      if (!userId) {
        return res.status(401).send('unauthorized')
      }
  }

  const { method, payload } = req.body
  const viewer = { userId }
  const { Attributes: updatedState } = await updateGameState({ method, payload, viewer })

  res.status(200).json({
    gameState: updatedState,
    viewer: {
      userId
    }
  });
  
}
