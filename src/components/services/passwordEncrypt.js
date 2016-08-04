/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const bcrypt = require('bcrypt-nodejs');
const log = require('../../utils/logging');

/*=====  End of MODULES  ======*/

/**
 * Encrypt the password
 * @param {String} value the value to be encrypted
 * @return {String} crypted value
 */
exports.encrypt = value => {
    return bcrypt.hashSync(value, bcrypt.genSaltSync(5));
};

/**
 * Compare the crypted values
 * @param {String} value the value to be compared
 * @param {String} key the value to be compared with
 * @return {Boolean} validity
 */
exports.compare = (value, key) => {
    return bcrypt.compareSync(value, key);
};