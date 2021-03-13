require('dotenv').config();

const mailConfig = {
    service: process.env.MAIL_SERVICE,
    smtp: process.env.MAIL_SMTP,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    mailto: process.env.MAIL_TO
}

module.exports = mailConfig