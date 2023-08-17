require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";


const defaultImagePath = process.env.DEFAULT_USER_EMAGE_PATH||'public/images/users/default.png';

const jwtActivationkey = process.env.JWT_ACTIVATION_KEY||'KJFGKDSGJE0IGJLGJHGDIFGHJFGHDJGDJGHDS';
const jwtaccesskey = process.env.JWT_ACCESS_KEY||'KJFGKDSGJE0IGLGJHGDIFGHJFGHDJGDJGHDS';
const jwtRefreshkey = process.env.JWT_REFRESH_KEY||'KJFGKDSGJHGDIFGHJFGHDJGDJGHDS';
const jwtresetkey = process.env.JWT_RESET_PASSWORD_KEY||'KJFGKDSGJE0IGHJFGHDJGDJGHDS';
const smtpUsername = process.env.SMTP_USERNAME||'';
const smtpPassword = process.env.SMTP_PASSWORD||'';
const clientUrl = process.env.CLIENT_URL||'';

module.exports = {serverPort,
    mongodbURL,
    defaultImagePath,
    jwtActivationkey,
    smtpUsername,
    smtpPassword,
    clientUrl,
    jwtaccesskey,
    jwtRefreshkey,
    jwtresetkey};
