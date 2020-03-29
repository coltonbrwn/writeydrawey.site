var { TABLES, API_METHODS } = require('../constants')
var shortid = require('shortid')
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB()

module.exports = async function(method, payload) {
  switch (method) {
    case API_METHODS.CREATE_GAME:
      return await createGame()
    default:
      return null;
  }
}

function createGame() {
  dynamodb.putItem({
    TableName: TABLES.GAMES,
    Item: {
      id: shortid.generate(),
      state: GAME_STATE.STARTING
    }
  }).promise()
}
