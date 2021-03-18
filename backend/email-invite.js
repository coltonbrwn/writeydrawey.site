var AWS = require('aws-sdk')

AWS.config = {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.AWS_REG
}
var ses = new AWS.SES();

export default async ({ playerAddress, fromName, gameId }) => {

  const message = `${ fromName } is inviting you to play a game of Writey Drawey.`
  const fromAddress = 'mail@writeydrawey.site'
  const subject = `${ fromName } wants to play Writey Drawey`
  const footer = ''
  const toAddress = playerAddress

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
    
    return await ses.sendEmail(params).promise()
}
