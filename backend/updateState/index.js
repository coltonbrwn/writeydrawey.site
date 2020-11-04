var uuid = require('uuid')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var uniqBy = require('lodash.uniqby')

var convertImage = require('./convert-image');
var { TABLES, GAME_QUEUE, API_METHODS, GAME_STATE, INITIAL_STATE } = require('../constants')

var dynamodb = new AWS.DynamoDB.DocumentClient()
var sqs = new AWS.SQS();

module.exports = function(method, payload, viewer) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return createGame(viewer)
    case API_METHODS.ADD_PLAYER:
      return addPlayer(payload, viewer)
    case API_METHODS.PLAYER_INPUT:
      return playerInput(payload, viewer)
    case API_METHODS.START_GAME:
      return startGame(payload, viewer)
    case API_METHODS.NEXT_ROUND:
      return nextRound(payload, viewer)
    case API_METHODS.END_GAME:
      return endGame(payload, viewer)
    default:
      return null;
  }
}

/*
  CREATE_GAME
 */
function createGame(viewer) {

  const newGameId = shortid.generate()
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: {
      ...INITIAL_STATE,
      id: newGameId,
      state: GAME_STATE.STARTING,
      admin: viewer.userId
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

  const gameState = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    }
  }).promise()
  const players = gameState.Item.players || []
  players.push({
    ...player,
    playerId: viewer.userId,
    ts: new Date().getTime()
  });
  const uniqPlayers = uniqBy(players, item => item.playerId)
  const newGameState = {
    ...gameState.Item,
    players: uniqPlayers
  }
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: newGameState
  }).promise().then( res => newGameState)
}

/*
 PLAYER_INPUT
 */
async function playerInput({ gameId, phrase, drawing, round }, viewer) {

  if (!(viewer && viewer.userId)) {
    return Promise.reject('Invalid Viewer')
  }

  const playerId = viewer.userId
  const gameState = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    }
  }).promise()
  const playerInput = gameState.Item.playerInput || []

  let imageUrl;
  if (drawing) {
    imageUrl = await convertImage.convertB64Image({
      rawImage: drawing,
      keyName: `g-${ gameId }/${ round }_p-${ playerId }`
    })
  }

  playerInput.push({
    playerId,
    phrase,
    drawing: imageUrl,
    round,
    ts: new Date().getTime(),
  })
  const newGameState = {
    ...gameState.Item,
    playerInput
  }
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: newGameState
  }).promise().then( res => newGameState)
}

/*
 START GAME
 */
async function startGame({ gameId }, viewer) {

  if (!(viewer && viewer.userId)) {
    return Promise.reject('Invalid Viewer')
  }

  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #game_state = :state_playing, #round = :one',
    ExpressionAttributeNames: {
      '#game_state': 'state',
      '#round': 'round'
    },
    ExpressionAttributeValues: {
      ':state_playing': GAME_STATE.PLAYING,
      ':one': 1
    }
  }).promise()
}

async function endGame({ gameId }, viewer) {

  sqs.sendMessage({
    QueueUrl: GAME_QUEUE.URL,
    MessageBody: JSON.stringify({
      topic: GAME_QUEUE.TOPIC,
      data: {
        gameId
      }
    })
  }, function(err, data) {
    console.log(err, data)
  })

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
    }
  }).promise()
}

async function nextRound({ gameId }) {
  return dynamodb.update({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    },
    UpdateExpression: 'set #a = #a + :one',
    ExpressionAttributeNames: {
      '#a' : 'round'
    },
    ExpressionAttributeValues: {
      ':one' : 1
    }
  }).promise()
}
