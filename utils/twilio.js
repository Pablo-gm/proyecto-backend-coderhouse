const twilio = require('twilio');
const {twilioConfig, IGNORE_TWILIO} = require('../config/options')
const {errorLogger} = require('./logger');


const client = twilio(twilioConfig.id, twilioConfig.token);

// Ignoramos toNumber para usar el sandbox de twitlio
const sendSMS = async (content, toNumber) => {
    if(IGNORE_TWILIO) { return 1 }
    try {
        const message = await client.messages.create({
            body: content,
            from: twilioConfig.fromNumber,
            to: twilioConfig.toNumber
        })
    } catch (err) {
        errorLogger.error(`Error: ${err}`);
    }
}

const sendWhatsapp = async (content, toNumber) => {
    if(IGNORE_TWILIO) { return 1 }
    try {
        const message = await client.messages.create({
            body: content,
            from: twilioConfig.fromWhatsappNumber,
            to: twilioConfig.toWhatsappNumber
        })

    } catch (err) {
        errorLogger.error(`Error: ${err}`);
    }
}

module.exports = {sendSMS, sendWhatsapp};