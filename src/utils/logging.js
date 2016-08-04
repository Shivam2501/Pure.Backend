/**
 * Created by shivambharuka on 7/18/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const path = require('path');
const winston = require('winston');
const logConfig = require('../../config').logging;

/*=====  End of MODULES  ======*/

class Logging {
    constructor() {
        this.instance = winston.add(winston.transports.File, {
            filename:  logConfig.filename,
            colorize:  true,
            json:      true,
            maxFiles:  5,
            maxsize:   10485760,
            levels:    {
                debug: 0,
                info:  1,
                warn:  2,
                error: 3
            }
        });
    }
}

module.exports = (new Logging().instance);