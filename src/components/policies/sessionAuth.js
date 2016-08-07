'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const handles = require('../services/response');
const log = require('../../utils/logging');
const Models = require('../models/schemas');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Users = Models.Users;

/*=====  End of MODELS  ======*/

/**
 * Middleware filter to verify an active user is provided
 * @param  {Object}   req  HTTP request
 * @param  {Object}   res  HTTP response
 * @param  {Function} next filter chain
 */
module.exports = (req, res, next) => {
    if(!req.isAuthenticated()) {
        log.error('Session not found');
        return handles.UNAUTHORIZED(res, 'Session not found', null);
    } else {
        return next();
    }
};