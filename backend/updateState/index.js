var uuid = require('uuid')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var uniqBy = require('lodash.uniqby')

var convertImage = require('./convert-image');
var { TABLES, API_METHODS, GAME_STATE, INITIAL_STATE, DEFAULT_TURN_DELAY, TURN_LIMIT } = require('../constants')

var dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = function(method, payload, viewer) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return createGame(payload, viewer)
    case API_METHODS.ADD_PLAYER:
      return addPlayer(payload, viewer)
    case API_METHODS.PLAYER_INPUT:
      return playerInput(payload, viewer)
    case API_METHODS.SET_TIMER:
      return setTimer(payload, viewer)
    case API_METHODS.START_GAME:
      return startGame(payload, viewer)
    case API_METHODS.END_GAME:
      return endGame(payload, viewer)
    case API_METHODS.NEXT_ROUND:
      return nextRound(payload, viewer)
    default:
      return Promise.reject(new Error(`Method ${ method } not found`))
  }
}

/*
  CREATE_GAME
 */
function createGame({ options }, viewer) {

  const newGameId = shortid.generate()
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: {
      ...INITIAL_STATE,
      id: newGameId,
      state: GAME_STATE.STARTING,
      admin: viewer.userId,
      options: options,
      created: new Date().getTime()
    }
  }).promise().then( res => ({
    id: newGameId
  }))
}

/*
  ADD_PLAYER
 */
async function addPlayer({ player, gameId }, viewer) {

  if (!(viewer && viewer.userId)) {
    return Promise.reject('Invalid Viewer')
  }

  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #players = list_append(#players, :vals)',
    ExpressionAttributeNames: {
      '#players': 'players'
    },
    ExpressionAttributeValues: {
      ':vals': [
        {
          ...player,
          playerId: viewer.userId,
          ts: new Date().getTime()
        }
      ]
    },
    ReturnValues: 'ALL_NEW'
  }).promise()
}

/*
 PLAYER_INPUT
 */
async function playerInput({ gameId, phrase, drawing, round }, viewer) {

  if (!(viewer && viewer.userId)) {
    return Promise.reject('Invalid Viewer')
  }

  const playerId = viewer.userId
  let imageUrl
  if (drawing) {
    imageUrl = await convertImage.convertB64Image({
      rawImage: drawing,
      keyName: `g-${ gameId }/${ round }_p-${ playerId }`
    })
  }

  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #playerInput = list_append(#playerInput, :vals)',
    ExpressionAttributeNames: {
      '#playerInput': 'playerInput'
    },
    ExpressionAttributeValues: {
      ':vals': [
        {
          playerId,
          phrase,
          drawing: imageUrl,
          round,
          ts: new Date().getTime(),
        }
      ]
    },
    ReturnValues: 'ALL_NEW'
  }).promise()

}

/*
 SET_TIMER
 */
async function setTimer({ gameId, round }, viewer) {

  if (!(viewer && viewer.userId)) {
    return Promise.reject('Invalid Viewer')
  }

  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #timers = list_append(#timers, :values)',
    ExpressionAttributeNames: {
      '#timers': 'timers'
    },
    ExpressionAttributeValues: {
      ':values': [
        {
          playerId: viewer.userId,
          round: round,
          end: new Date().getTime() + TURN_LIMIT
        }
      ]
    },
    ReturnValues: 'ALL_NEW'
  }).promise()
}

/*
 END GAME
 */
async function endGame({ gameId }, viewer) {
  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #game_state = :state_done',
    ExpressionAttributeNames: {
      '#game_state': 'state'
    },
    ExpressionAttributeValues: {
      ':state_done': GAME_STATE.DONE
    },
    ReturnValues: 'ALL_NEW'
  }).promise()
}

/*
 NEXT ROUND
 */
async function nextRound({ gameId, round }) {

  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #round = #round + :one, #game_state = :playing_state, #timers = list_append(#timers, :timers)',
    ExpressionAttributeNames: {
      '#round': 'round',
      '#timers': 'timers',
      '#game_state': 'state'
    },
    ExpressionAttributeValues: {
      ':one': 1,
      ':playing_state': GAME_STATE.PLAYING,
      ':timers': [
        {
          playerId: '0',
          round: round + 1,
          end: new Date().getTime() + 5000
        }
      ]
    },
    ReturnValues: 'ALL_NEW'
  }).promise()

}
