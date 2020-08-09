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
    var { fromAddress, toAddress, message, subject, footer } = JSON.parse(event.body)
  } catch (e) {
    return cb(null, {
      statusCode: 500,
      body: JSON.stringify({ message:'Error parsing request'}),
      headers: corsHeaders
    })
  }

  var params = {
      Destination: {
          BccAddresses: [],
          CcAddresses: [
            fromAddress
          ],
          ToAddresses: [
            toAddress
          ]
      },
      Message: {
          Body: {
              Html: {
                  Charset: "UTF-8",
                  Data: `${ message } <br/><br/><hr/>${ footer }`
              },
              Text: {
                  Charset: "UTF-8",
                  Data: message
              }
          },
          Subject: {
              Charset: "UTF-8",
              Data: subject
          }
      },
      Source: fromAddress
    };
    ses.sendEmail(params, function(err, data) {
        if (err) {
          console.log(err);
          return cb(null, {
            statusCode: 500,
            body: JSON.stringify({ message:'Error sending message'}),
            headers: corsHeaders
          })
        }
        cb(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Success'}),
          headers: corsHeaders
        })
    });
}
