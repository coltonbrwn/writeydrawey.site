var axios = require('axios')
var fs = require('fs')
var Path = require('path')
var AWS = require('aws-sdk')
const request = require('request')

var { TABLES, API_METHODS, GAME_STATE } = require('../constants')

const BATCH_SIZE_GAMES = 10
var dynamodb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S1rXysbDt9RIuW5IG4,
  region: process.env.AWS_REGION
})

const downloadTask = task =>
  new Promise((resolve, reject) => {
    request.head(task.url, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      const path = Path.resolve(
        __dirname,
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

  console.log('Archive starting')
  console.log(`Environment is '${ process.env.NODE_ENV || 'prod' }'`)

  try {

    const { Items } = await dynamodb.scan({
      TableName: TABLES[ process.env.NODE_ENV === 'dev' ? 'GAMES_DEV' : 'GAMES'],
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

    console.log(`${ Items.length } games fetched ...`)

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

    console.log(`${ archiveResults.length } games archived ...`)

    console.log('Done')

  } catch (e) {
    console.log(e)
  }

}
