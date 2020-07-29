var { TABLES, API_METHODS, GAME_STATE } = require('../constants');
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

  const {Items: games, Count, ScannedCount, LastEvaluatedKey} = await dynamodb.scan({
    TableName: TABLES.GAMES,
    FilterExpression: '#state = :done_state',
    ExpressionAttributeNames: {
      '#state': 'state'
    },
    ExpressionAttributeValues: {
      ':done_state': GAME_STATE.DONE
    },
    ExclusiveStartKey: {
      id: 'nOPi2xebW'
    }
  }).promise();

  console.log(Count, ScannedCount, LastEvaluatedKey)

  return { games }
}
