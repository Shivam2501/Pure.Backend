/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const log = require('../../utils/logging');

/*=====  End of MODULES  ======*/

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const nodemailerMailergun = nodemailer.createTransport(mg(auth));

/**
 * Send Email
 * @param toEmail receiver's email address
 * @param subject subject of the message
 * @param html html of the body
 * @param text plain text of the body
 * @returns {Promise} send success/error
 */
module.exports = (toEmail, subject, html, text) => {

    if (process.env.NODE_ENV == 'development') {
        toEmail = 'shivam.bharuka@gmail.com'; //only authorised accounts can be sent using sandbox account
    }

    return new Promise((resolve, reject) => {
        nodemailerMailergun.sendMail({
            from: 'shivam.bharuka@gmail.com',
            to: toEmail,
            subject: subject,
            html: html,
            text: text
        }, (err, info) => {
            if (err) {
                log.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};