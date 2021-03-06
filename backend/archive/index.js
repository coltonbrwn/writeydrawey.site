var fs = require('fs')
var Path = require('path')
var AWS = require('aws-sdk')
const request = require('request')

var { TABLES, DB_INDEXES, API_METHODS, GAME_STATE } = require('../../lib/constants')

const BATCH_SIZE_GAMES = 100
var dynamodb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
})
let directory = __dirname;

const downloadTask = task =>
  new Promise((resolve, reject) => {
    request.head(task.url, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      const path = Path.resolve(
        directory,
        'test-images',
        `${ task.createdTime }_${ task.player }.png`
      )
      request(task.url)
        .pipe(fs.createWriteStream(path))
        .on('error', reject)
        .on('close', () => {
          resolve( task )
        })

    })
  })

module.exports.handler = async function(event, context, cb) {

  const tableName = TABLES[ process.env.node_env === 'dev' ? 'GAMES_DEV' : 'GAMES']
  const startDate = new Date().getTime()
  console.log(`+-- Archive starting [${ new Date().toUTCString() }]`)
  console.log(`+   Environment is '${ process.env.node_env || 'prod' }'`)

  if (process.argv[2]) {
    directory = process.argv[2]
  }
  console.log(`+   Image directory is '${ directory }'`)

  try {

    const { Items } = await dynamodb.scan({
      TableName: tableName,
      ScanFilter: {
        'state': {
          AttributeValueList: [ GAME_STATE.DONE ],
          ComparisonOperator: 'EQ'
        },
        'archived': {
          ComparisonOperator: 'NULL'
        }
      },
      Limit: BATCH_SIZE_GAMES
    }).promise()

    console.log(`+   ${ Items.length } games fetched ...`)

    if (!Items.length) {
      console.log(`+-- Done, none archived [${ new Date().getTime() - startDate }ms elapsed]\n`)
      return;
    }

    const tasks = []
    Items.forEach( game => {
      const gameId = game.id
      const players = game.players
      game.playerInput.filter( item => item.drawing ).map(drawing => {
        let d = new Date(drawing.ts)
        tasks.push({
          createdTime: `${ d.getDate() }-${ d.getMonth() }-${ d.getFullYear() }-${ d.getHours() }${ d.getMinutes() }${ d.getSeconds() }`,
          url: drawing.drawing,
          player: players.find( p => p.playerId === drawing.playerId ).playerName,
          game: gameId
        })
      })
    })

    const archiveResults = await Promise.allSettled(
      tasks.map( downloadTask )
    )

    console.log(`+   ${ archiveResults.length } images archived ...`)

    await dynamodb.transactWrite({
      TransactItems: Items.map( item => ({
        Update: {
          TableName: tableName,
          Key: {
            id: item.id
          },
          UpdateExpression: 'set #archived = :archived_date',
          ExpressionAttributeNames: {
            '#archived': 'archived'
          },
          ExpressionAttributeValues: {
            ':archived_date': new Date().getTime()
          }
        }
      }))
    }).promise()

    console.log(`+-- Done [${ new Date().getTime() - startDate }ms elapsed]\n`)

  } catch (e) {
    console.log(e)
  }

}
