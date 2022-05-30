// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// NOTE:
// set from phone number in env variable as from_ph
const twilio_simple_message_sender_api = async (req, res) => {
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({success: true, msg: "Health check success"}))
    res.end()
  }
  try {
    let resp = await client.messages.create({
          body: req.body.msg,
          from: process.env.from_ph,
          to: req.body.to_ph
        })
    
        if(resp) {
          res.write(JSON.stringify({success: true, msg: `Message sent successfully!`})).status(200)
          res.end()
        }  
  }
  catch(e) {
    res.write(JSON.stringify({success: false, msg: `Issue in delivering message!`})).status(404)
    res.end()
  }
}

export default twilio_simple_message_sender_api
