/**
 * Created by shivambharuka on 8/7/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const uuid = require('node-uuid');

/*=====  End of MODULES  ======*/

/**
 * Generate a new UUID
 * @returns {UUID} new uuid
 */
module.exports = () => {
    return uuid.v4();
};