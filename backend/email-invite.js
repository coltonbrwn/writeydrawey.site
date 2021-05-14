var AWS = require('aws-sdk')

function gameUrl({ gameId }) {
    return process.env.NEXT_PUBLIC_NODE_ENV === 'development'
        ? `http://localhost:3030/${ gameId }`
        : `https://writeydrawey.site/${ gameId }`
}

AWS.config = {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.AWS_REG
}
var ses = new AWS.SES();

export default async ({ playerAddress, fromName, gameId }) => {

  const message = `
    <p>${ fromName } is inviting you to play a game of Writey Drawey.</p>
    <p><a href="${ gameUrl({ gameId })  }">Follow this link</a> to join up!</a></p>
    <br/>
    <i>
        Writey Drawey is a free web game you can play with friends, family, or coworkers.
    </i>
    <br/>
    ---
    <br/>
    <small>
        visit <a href="https://writeydrawey.site">www.writeydrawey.site</a>
        <br/>
        or follow us <a href="https://twitter.com/writey_drawey"> on twitter</a>
    </small>
  `
  const fromAddress = 'Writey Drawey Mail Robot <mail@writeydrawey.site>'
  const subject = `${ fromName } wants to play Writey Drawey`
  const footer = ''
  const toAddress = playerAddress

  var params = {
      Destination: {
          BccAddresses: [],
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
