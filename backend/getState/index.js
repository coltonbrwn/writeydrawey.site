var { TABLES, API_METHODS } = require('../constants');
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB();

module.exports = async function(id) {
  return await dynamodb.getItem({
    TableName: TABLES.GAMES,
    Key: {
      id
    }
  }).promise()
}
