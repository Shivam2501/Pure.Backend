/**
 * Created by shivambharuka on 8/28/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const handles = require('../components/services/response');
const log = require('../utils/logging');

/*=====  End of MODULES  ======*/

module.exports = class error {

    handler(res, err, message) {
        log.error(`${message}: ${err}`);
        return handles.BAD_REQUEST(res, `${message}`, err);
    }
};
