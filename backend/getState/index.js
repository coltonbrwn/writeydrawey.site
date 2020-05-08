var { TABLES, API_METHODS } = require('../constants');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

function sort(array) {
  if (!Array.isArray(array)) {
    return array;
  }
  return array.sort((a, b) => (
    a.ts - b.ts
  ))
}

module.exports = async function(id) {
  const { Item: gameState } = await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id
    }
  }).promise();

  if (!gameState) {
    return null
  }

  return {
    id: gameState.id,
    round: gameState.round,
    state: gameState.state,
    admin: gameState.admin,
    players: sort( gameState.players ),
    playerInput: sort( gameState.playerInput )
  };
}
