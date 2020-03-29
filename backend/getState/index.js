var { TABLES, API_METHODS } = require('../constants');
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = async function(id) {

  const { Item: gameState } = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id
    }
  }).promise();

  if (!gameState.playerInput) {
    return gameState
  }
  return dynamodb.batchGet({
    RequestItems: {
      [TABLES.PLAYERS]: {
        Keys: gameState.playerInput.map( playerInput => ({ id: playerInput.playerId }))
      }
    }
  }).promise().then(playersResponse => ({
    ...gameState,
    players: playersResponse.Responses[ TABLES.PLAYERS ]
  }))

}
