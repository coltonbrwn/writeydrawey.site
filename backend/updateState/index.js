var { TABLES, API_METHODS, GAME_STATE } = require('../constants')
var uuid = require('uuid')
var shortid = require('shortid')
var AWS = require('aws-sdk')
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
  const newGameState = {
    ...gameState.Item,
    players
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
  playerInput.push({
    playerId,
    phrase,
    drawing,
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
  const gameState = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id: gameId
    }
  }).promise()
  const newGameState = {
    ...gameState.Item,
    state: GAME_STATE.PLAYING,
    round: 1
  }
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: newGameState
  }).promise().then( res => newGameState)
}
