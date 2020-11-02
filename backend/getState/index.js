var { TABLES, API_METHODS } = require('../constants');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

function sortByTimestamp(array) {
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
    admin: gameState.admin,
    id: gameState.id,
    options: {
      rounds: gameState.players.length,
      ...gameState.options
    },
    players: sortByTimestamp( gameState.players ),
    playerInput: sortByTimestamp( gameState.playerInput ),
    round: gameState.round,
    timers: gameState.timers,
    state: gameState.state
  };
}
