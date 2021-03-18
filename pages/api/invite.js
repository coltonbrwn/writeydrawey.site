import emailInvite from '../../backend/email-invite'

import { parseCookie } from '../../lib/util'

export default async function invite(req, res) {

  try {

    let userId = parseCookie(req);
    if (!userId) {
      throw new Error('Unauthorized')
    }
    const { payload } = req.body
    const { playerAddress, fromName, gameId } = payload

    await emailInvite({ playerAddress, fromName, gameId })

    res.status(200).json({
      error: null,
      status: 'ok'
    });
  } catch (e) {
    console.warn(e)
    res.status(500).json({
      error: e,
      status: null
    })
  }
  
}
