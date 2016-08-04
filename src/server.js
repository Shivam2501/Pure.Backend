/**
 * Created by shivambharuka on 7/17/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const http = require('http');
const app = require('./app');
const config = require('../config');
const log = require('./utils/logging');

/*=====  End of MODULES  ======*/

/*----------  EXECUTE WEB SERVER  ----------*/
const server = http.createServer(app);

server.listen(config.server.port, () => {
    log.info(`Web Server Started at ${config.server.port}`);
});