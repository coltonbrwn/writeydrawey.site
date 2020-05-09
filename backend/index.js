var getState = require('./getState/index.js')
var updateState = require('./updateState/index.js')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type'
};

module.exports.cors = (event, context, cb) => {
  cb(null, {
    statusCode: 200,
    headers: corsHeaders
  });
}

/*
  SUBMIT
 */
module.exports.update = async (event, context, cb) => {

  try {
    var { method, payload, viewer } = JSON.parse(event.body)
  } catch (e) {
    return cb(null, {
      statusCode: 400,
      body: JSON.stringify({ message:'Error parsing request'}),
      headers: corsHeaders
    })
  }

  try {
    var response = await updateState(method, payload, viewer);
  } catch (error) {
    return cb(null, {
      statusCode: 500,
      body: JSON.stringify({ message:'Error executing request', error }),
      headers: corsHeaders
    })
  }
  cb(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success', method, response }),
    headers: corsHeaders
  })
}

/*
  GET
 */
module.exports.get = async (event, context, cb) => {

  try {
    var { id }  = event.queryStringParameters;
  } catch (err) {
    return cb(null, {
      statusCode: 400,
      body: JSON.stringify({ message:'Error parsing request'}),
      headers: corsHeaders
    })
  }

  try {
    var response = await getState(id);

    if (!response) {
      return cb(null, {
        statusCode: 404,
        headers: corsHeaders
      })
    }

  } catch (error) {
    console.log(error)
    return cb(null, {
      statusCode: 500,
      body: JSON.stringify({ message:'Error executing request', error }),
      headers: corsHeaders
    })
  }

  return cb(null, {
    statusCode: 200,
    body: JSON.stringify( response ),
    headers: corsHeaders
  })

}
