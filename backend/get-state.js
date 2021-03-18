import AWS from 'aws-sdk'
import { TABLES } from '../lib/constants'

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
const dynamodb = new AWS.DynamoDB.DocumentClient();
const gamesTable = TABLES[ process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'GAMES_DEV' : 'GAMES']

export default async ({ id }) => await dynamodb.get({
  TableName: gamesTable,
  Key: {
    id
  }
}).promise()
