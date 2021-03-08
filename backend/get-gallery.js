import AWS from 'aws-sdk'
import { BUCKETS } from '../lib/constants'

AWS.config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REG
}
const s3 = new AWS.S3()
const archiveBucketName = BUCKETS[ process.env.node_env === 'dev' ? 'ARCHIVE_DEV' : 'ARCHIVE']
const getObjectUrl = key => `https://${ archiveBucketName }.s3.amazonaws.com/${ key }`

export default async ({ offsetKey }) => {
    const params = {
        Bucket: archiveBucketName,
        MaxKeys: 200
    }
    if (offsetKey) {
        params.StartAfter = offsetKey
    }

    const { Contents, IsTruncated } = await s3.listObjectsV2(params).promise()

    const contents = Contents.map(item => {
        item.url = getObjectUrl( item.Key )
        return item
    })

    return {
        contents,
        isTruncated: IsTruncated
    }
}