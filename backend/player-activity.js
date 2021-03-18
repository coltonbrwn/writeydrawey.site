import AWS from 'aws-sdk'
import { TABLES } from '../lib/constants'

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
const dynamodb = new AWS.DynamoDB.DocumentClient()
const tableName = TABLES[ process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'ACTIVE_PLAYERS_DEV' : 'ACTIVE_PLAYERS'] 

export const getGamePlayerActivity = async ({ gameId }) => (
    await dynamodb.query({
        TableName: tableName,
        IndexName: 'game-id-index',
        KeyConditionExpression: 'gameId = :game_id',
        ExpressionAttributeValues: {
            ':game_id': gameId
        }
    }).promise()
)

export const updatePlayerActivity = async ({ gameId, playerId }) => (
    await dynamodb.update({
        TableName: tableName,
        Key: { id : playerId },
        UpdateExpression: 'set lastSeen = :now, gameId = :gameId',
        ExpressionAttributeValues: {
          ':now' : new Date().getTime(),
          ':gameId' : gameId
        }
    }).promise()
)