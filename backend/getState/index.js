var { TABLES, API_METHODS } = require('../constants');
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = async function(id) {
  return await dynamodb.get({
    TableName: TABLES.GAMES,
    Key: {
      id
    }
  }).promise()
}
