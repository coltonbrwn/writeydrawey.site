var sharp = require('sharp')
var AWS = require('aws-sdk')
var uuid = require('uuid')
var { GAME_STATE, BUCKETS } = require('../../lib/constants')

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
var s3 = new AWS.S3();
let directory = __dirname;

const imageBucketName = BUCKETS[ process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'IMAGES_DEV' : 'IMAGES']
const archiveBucketName = BUCKETS[ process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'ARCHIVE_DEV' : 'ARCHIVE']
const localEnv = process.env.NEXT_PUBLIC_NODE_ENV

const getGameIdFromKeyName = keyName => {
  try {
    const regex = /^g-(.*)\//mg
    return regex.exec(keyName)[1]
  } catch (e) {
    console.log(keyName)
    console.log(e)
  }
}
const getPlayerIdFromKeyName = keyName => {
  try {
    const regex = /^(g-.*\/\d+_p-)([a-f0-9-]*)/mg
    return regex.exec(keyName)[2]
  } catch (e) {
    console.log(e)
  }
}

const s3ListAllObjects = ({ Bucket }) => {
  let contents = [];
  const fetchObjects = ({ ContinuationToken }) => s3.listObjectsV2({
    Bucket,
    ContinuationToken
  }).promise().then( ({ Contents, IsTruncated, NextContinuationToken }) => {
    contents = contents.concat(Contents);
    if (IsTruncated) {
      return fetchObjects({ ContinuationToken: NextContinuationToken })
    }
    console.log(`+   Found ${ contents.length } Objects in ${ Bucket }`)
    return Promise.resolve(contents)
  })
  return fetchObjects({})
}

module.exports.handler = async function(event, context, cb) {

  const startDate = new Date().getTime()
  console.log(`+-- Archive starting [${ new Date().toUTCString() }]`)
  console.log(`+   Environment is '${ localEnv }'`)

  if (process.argv[2]) {
    directory = process.argv[2]
  }

  try {

    const Objects = await s3ListAllObjects({ Bucket: imageBucketName })
    Objects.sort( (a, b) => {
     new Date(a.LastModified) - new Date(b.LastModified)
    })

    /*
      In-Memory: Group objects by gameId to determine validity of game.
      {
        [gameId]: { <gameMapItem>
          id: String,
          images: [ String ],
          inferredStatus: Boolean,
          isArchived: Boolean
        }
      }
    */
    const gamesMap = Objects.reduce((acc, val) => {
      const gameId = getGameIdFromKeyName(val.Key)
      if (!acc[gameId]) {
        acc[gameId] = {
          id: gameId,
          images: [],
          inferredStatus: null
        }
      }
      acc[gameId].images.push( val.Key )
      return acc
    }, {})


    /* 
      Infer the status of the game based on a simple heuristic.
      We can't call the DB because most of the early game data was accidentally deleted 👍🏼
     */
    Object.keys(gamesMap).forEach( key => {
      const val = gamesMap[key]
      val.inferredStatus = val.images.length >= 6 ? GAME_STATE.DONE : GAME_STATE.STARTING
    })

    /*
      [ <gameMapItem> ]
    */
    const gamesToBeArchived = Object.values(gamesMap)
      .filter( game => (game.inferredStatus === GAME_STATE.DONE))

    let tasks = []
    gamesToBeArchived.forEach( game => {
      const gameId = game.id
      const images = game.images
      tasks = tasks.concat( images.map( originalKey => ({
        originalKey,
        gameId,
        playerId: getPlayerIdFromKeyName(originalKey)
      })))
    })

    const archiveTask = async ({ originalKey }) => {
      const orderingKey = uuid.v4().slice(0, 8)
      const image = await s3.getObject({
        Bucket: imageBucketName,
        Key: originalKey
      }).promise();
      const resizedImg = await sharp(image.Body)
        .resize(300)
        .toFormat('png')
        .toBuffer();
      return await s3.putObject({
        Bucket: archiveBucketName,
        Body: resizedImg,
        Key: `${ orderingKey }_${ originalKey }_thumb.png`,
        ACL: 'public-read'
      }).promise();
    }

    const archiveResults = await Promise.allSettled(
      tasks.map( archiveTask )
    )

    const numSuccess = archiveResults.reduce((acc, val) => (val.status === 'fulfilled' ? acc + 1 : acc), 0)
    const numFail = archiveResults.reduce((acc, val) => (val.status !== 'fulfilled' ? acc + 1 : acc), 0)

    console.log(`+  ${ numSuccess } succeeded`)
    console.log(`+  ${ numFail } failed`)
    console.log(`+-- Done [${ new Date().getTime() - startDate }ms elapsed]\n`)

  } catch (e) {
    console.log(e)
  }

}
