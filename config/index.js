/**
 * Created by shivambharuka on 7/18/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');

require('dotenv').config();
const env = require('./' + process.env.NODE_ENV);

/*=====  End of MODULES  ======*/

class Environment {
    constructor() {

        this.server = {
            port: process.env.PORT,
            env: process.env.NODE_ENV
        };

        this.logging = {
            filename: env.log.filename
        };

        const dbUrl = require('url').parse(env.database.url);
        this.database = {
            database: dbUrl.pathname.substr(1),
            username: dbUrl.auth.split(':')[0],
            password: dbUrl.auth.split(':')[1],
            host: dbUrl.host.split(':')[0],
            dialect: env.database.engine
        };

        this.session = {
            url: env.session.url,
            secret: env.session.secret
        };
    }
}

module.exports = (new Environment());