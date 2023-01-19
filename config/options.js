require('dotenv').config();

const parseArgs  = require('minimist');
const args = parseArgs(process.argv.slice(2),  { alias: { dao: "DAO"}, default: { DAO: "mongodb" } });

const DAO_METHOD = process.env.DAO_METHOD || args.DAO || 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
const PORT = process.env.PORT || 8080;
const USE_CLUSTER = process.env.USE_CLUSTER || 0;
const SESSION_LIMIT = process.env.SESSION_LIMIT || 900000;


// Nodemailer Gmail
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS || '';
const NOTIFICATIONS_EMAIL = process.env.NOTIFICATIONS_EMAIL || '';

// Uso de twilio
const IGNORE_TWILIO = process.env.IGNORE_TWILIO | 0;

const twilioConfig = {
    id: process.env.TWILIO_ID || '',
    token: process.env.TWILIO_TOKEN || '',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '',
    toNumber: process.env.TWILIO_TO_NUMBER || '',
    fromWhatsappNumber: process.env.TWILIO_WHATSAPP_FROM_NUMBER || '',
    toWhatsappNumber: process.env.TWILIO_WHATSAPP_TO_NUMBER || '',
}

const firebaseConfig = {
    serviceAccount: {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri":  process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509,
        "client_x509_cert_url": process.env.CLIENT_X509
    }
}

module.exports = {DAO_METHOD, MONGO_URI, PORT, USE_CLUSTER, SESSION_LIMIT, ADMIN_EMAIL, ADMIN_EMAIL_PASS, NOTIFICATIONS_EMAIL,IGNORE_TWILIO, twilioConfig,  firebaseConfig};