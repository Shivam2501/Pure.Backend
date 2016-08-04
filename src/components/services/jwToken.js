/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const jwt = require('jsonwebtoken');
const sessionConfig = require('../../../config').session;

/*=====  End of MODULES  ======*/

/**
 * Creates the jwt token
 * @param {json} payload id of the user
 * @return {String} generated token
 */
exports.issue = payload => {
  return jwt.sign({ payload }, sessionConfig.jwtSecret, {
      expiresIn: 15 * 24 * 60
  });
};

/**
 * Verify the jwt token
 * @param {String} token token received
 * @param {function} callback callback function
 * @return {Promise} promise result
 */
exports.verify = (token, callback) => {
    return jwt.verify(token, sessionConfig.jwtSecret, callback);
};