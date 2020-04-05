var uuid = require('uuid')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var uniqBy = require('lodash.uniqby')

var convertImage = require('./convert-image');
var { TABLES, API_METHODS, GAME_STATE } = require('../constants')

var dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = async function(method, payload) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return await createGame()
    case API_METHODS.ADD_PLAYER:
      return await addPlayer(payload)
    case API_METHODS.PLAYER_INPUT:
      return await playerInput(payload)
    case API_METHODS.START_GAME:
      return await startGame(payload)
    case API_METHODS.NEXT_ROUND:
      return await nextRound(payload)
    case API_METHODS.END_GAME:
      return await endGame(payload)
    default:
      return null;
  }
}

/*
  CREATE_GAME
 */
function createGame() {
  const newGameId = shortid.generate()
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: {
      id: newGameId,
      state: GAME_STATE.STARTING,
      round: 0
    }
  }).promise().then( res => ({
    id: newGameId
  }))
}

/*
  ADD_PLAYER
 */
async function addPlayer({ player, gameId }) {
  const gameState = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    }
  }).promise()
  const players = gameState.Item.players || []
  players.push({
    ...player,
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
async function playerInput({ playerId, gameId, phrase, drawing, round }) {
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
async function startGame({ gameId }) {
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

async function endGame({ gameId }) {
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
