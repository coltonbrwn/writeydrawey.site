var sharp = require('sharp')
var AWS = require('aws-sdk')
var { GAME_STATE, BUCKETS } = require('../../lib/constants')

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
var s3 = new AWS.S3();
let directory = __dirname;

const imageBucketName = BUCKETS[ process.env.node_env === 'dev' ? 'IMAGES_DEV' : 'IMAGES']
const archiveBucketName = BUCKETS[ process.env.node_env === 'dev' ? 'ARCHIVE_DEV' : 'ARCHIVE']

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
    console.log(`+   Found ${ Contents.length } Objects in ${ Bucket }`)
    contents = contents.concat(Contents);
    if (IsTruncated) {
      return fetchObjects({ ContinuationToken: NextContinuationToken })
    }
    return Promise.resolve(contents)
  })
  return fetchObjects({})
}

module.exports.handler = async function(event, context, cb) {

  const startDate = new Date().getTime()
  console.log(`+-- Archive starting [${ new Date().toUTCString() }]`)
  console.log(`+   Environment is '${ process.env.node_env || 'prod' }'`)

  if (process.argv[2]) {
    directory = process.argv[2]
  }

  console.log(process.env)

  try {

    const Objects = await s3ListAllObjects({ Bucket: imageBucketName })

    /*
      {
        [gameId] : Boolean
      }
     */
    const ArchivedObjects = await s3ListAllObjects({ Bucket: archiveBucketName })
    const archivedObjectsMap = ArchivedObjects.reduce((acc, val) => {
      acc[getGameIdFromKeyName(val.Key)] = true
      return acc
    }, {})
    
    /*
      Group objects by gameId
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
          inferredStatus: null,
          isArchived: null
        }
      }
      acc[gameId].images.push( val.Key )
      return acc
    }, {})

    Object.keys(gamesMap).forEach( key => {
      const val = gamesMap[key]
      val.inferredStatus = val.images.length >= 6 ? GAME_STATE.DONE : GAME_STATE.STARTING
      val.isArchived = Boolean(archivedObjectsMap[key])
    })

    /*
      [ <gameMapItem> ]
    */
    const gamesToBeArchived = Object.values(gamesMap)
      .filter( game => (!game.isArchived && game.inferredStatus === GAME_STATE.DONE))

    if (!gamesToBeArchived.length) {
      console.log(`+-- Done, none archived [${ new Date().getTime() - startDate }ms elapsed]\n`)
      return;
    }

    let tasks = []
    gamesToBeArchived.forEach( game => {
      const gameId = game.id
      const images = game.images
      tasks = tasks.concat( images.map( img => ({
        key: img,
        gameId,
        playerId: getPlayerIdFromKeyName(img)
      })))
    })

    const archiveTask = async ({ key, gameId, playerId }) => {
      const image = await s3.getObject({
        Bucket: imageBucketName,
        Key: key
      }).promise();
      const resizedImg = await sharp(image.Body)
        .resize(300)
        .toFormat('png')
        .toBuffer();
      return await s3.putObject({
        Bucket: archiveBucketName,
        Body: resizedImg,
        Key: `${ key }_thumb.png`,
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
