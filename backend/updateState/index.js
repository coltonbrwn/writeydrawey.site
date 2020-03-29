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
  return dynamodb.put({
    TableName: TABLES.GAMES,
    ReturnValues: "ALL_NEW",
    Item: {
      id: shortid.generate(),
      state: GAME_STATE.STARTING
    }
  }).promise()
}
