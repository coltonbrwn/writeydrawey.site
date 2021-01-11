import AWS from 'aws-sdk'
import { TABLES } from '../lib/constants'

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
var dynamodb = new AWS.DynamoDB.DocumentClient();

export default async ({ id }) => await dynamodb.get({
  TableName: TABLES[ process.env.node_env === 'dev' ? 'GAMES_DEV' : 'GAMES'],
  Key: {
    id
  }
}).promise();
