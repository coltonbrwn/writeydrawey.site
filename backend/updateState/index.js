var { TABLES, API_METHODS, GAME_STATE } = require('../constants')
var uuid = require('uuid')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = async function(method, payload) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return await createGame()
    case API_METHODS.CREATE_PLAYER:
      return await createPlayer(payload)
    case API_METHODS.SUBMIT_PHRASES:
      return await submitPhrases(payload)
    case API_METHODS.START_GAME:
      return await startGame(payload)
    default:
      return null;
  }
}

function createGame() {
  const newGameId = shortid.generate()
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: {
      id: newGameId,
      state: GAME_STATE.STARTING
    }
  }).promise().then( res => ({
    id: newGameId
  }))
}

function createPlayer({ name, photo }) {
  const newPlayer = {
    id: uuid.v4(),
    name,
    photo
  }
  return dynamodb.put({
    TableName: TABLES.PLAYERS,
    Item: newPlayer
  }).promise().then( res => newPlayer )
}

async function submitPhrases({ player, game, phrases }) {
  const gameState = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id: game
    }
  }).promise()

  const playerInput = gameState.Item.playerInput || []
  playerInput.push({
    playerId: player,
    phrase: phrases[0],
    ts: new Date().getTime()
  })
  gameState.playerInput = playerInput

  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: {
      ...gameState.Item,
      playerInput
    }
  }).promise()

}

function startGame({ gameId }) {
  const newGameState = {
    id: gameId,
    state: GAME_STATE.PLAYING
  }
  return dynamodb.put({
    TableName: TABLES.GAMES,
    Item: newGameState
  }).promise().then( res => newGameState)
}
