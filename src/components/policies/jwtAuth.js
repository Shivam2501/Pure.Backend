'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const handles = require('../services/response');
const log = require('../../utils/logging');
const Models = require('../models/schemas');
const jwt = require('../services/jwToken');

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

    if(!req.headers && !req.headers.authorization) {
        log.error('Access Token is Invalid');
        return handles.UNAUTHORIZED(res, 'Access Token is Invalid', null);
    } else {
        const parts = req.headers.authorization.split(' ');
        if(parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                jwt.verify(credentials, (err, token) => {
                    if(err) {
                        return handles.UNAUTHORIZED(res, 'JWT Token is Invalid', null);
                    } else {
                        req.user.token = token;
                        return next();
                    }
                })
            } else {
                log.error('Format is Authorization: Bearer [token]');
                return handles.UNAUTHORIZED(res, 'Format is Authorization: Bearer [token]', null);
            }
        } else {
            log.error('Format is Authorization: Bearer [token]');
            return handles.UNAUTHORIZED(res, 'Format is Authorization: Bearer [token]', null);
        }
    }
};