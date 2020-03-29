var AWS = require('aws-sdk')

var ses = new AWS.SES();
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type'
};

module.exports.cors = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    headers: corsHeaders
  });
}

module.exports.submit = (event, context, cb) => {

  try {
    var { method } = JSON.parse(event.body)
  } catch (e) {
    return cb(null, {
      statusCode: 500,
      body: JSON.stringify({ message:'Error parsing request'}),
      headers: corsHeaders
    })
  }

  cb(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success', method }),
    headers: corsHeaders
  })
}
