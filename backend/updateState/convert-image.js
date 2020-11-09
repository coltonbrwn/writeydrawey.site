var AWS = require('aws-sdk')
var constants = require('../constants');

var s3 = new AWS.S3();

module.exports.convertB64Image = function convertB64Image({ rawImage, keyName }) {
  const base64Data = Buffer.from(rawImage.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  const type = rawImage.split(';')[0].split('/')[1]
  const params = {
    Bucket: constants.BUCKETS[process.env.NODE_ENV === 'dev' ? 'IMAGES_DEV' : 'IMAGES'],
    Key: keyName,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${ type }`
  };
  return s3.upload(params).promise().then( ({ Location }) => Location );
}
