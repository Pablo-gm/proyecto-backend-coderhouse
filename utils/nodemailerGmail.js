const { createTransport } = require('nodemailer');
const { ADMIN_EMAIL_PASS, ADMIN_EMAIL } = require('../config/options');
const {errorLogger} = require('./logger');

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_EMAIL_PASS
    }
});

const sendEmail = async (options) => {
    try {
        const info = await transporter.sendMail(options);
        return info;
    } catch (err) {
        errorLogger.error(`Error: ${err}`);
    }
}

module.exports = sendEmail;