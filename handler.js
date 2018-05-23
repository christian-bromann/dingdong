const AWS = require('aws-sdk')

AWS.config.region = 'eu-west-1'
const sns = new AWS.SNS()

const MESSAGE = 'Someone is at the door. Open up!!!'
const SUBJECT = 'SOUNDBURN X AWK SCL Rooftop Party'
const SUCCESS_RESPONSE = `<h1>Yay! Someone is on its way</h1>`
const ERROR_RESPONSE = `<h1 style="color: red">Uups, something went wrong! Please post in the FB event, thanks!</h1>`

const params = {
    PhoneNumber: '+49XXX',
    Message: MESSAGE,
    MessageStructure: 'string'
}

module.exports.message = (event, context, callback) => {
    sns.publish(params, (err, data) => callback(null, {
      statusCode: 200,
      headers: { 'content-type': 'text/html; charset=UTF-8' },
      body: err ? ERROR_RESPONSE + err.stack : SUCCESS_RESPONSE
    }))
};
