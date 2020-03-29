var { TABLES, API_METHODS, GAME_STATE } = require('../constants')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = async function(method, payload) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return await createGame()
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
