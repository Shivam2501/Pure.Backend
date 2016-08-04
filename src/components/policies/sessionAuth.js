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
    if(!req.user.token) {
        log.error('Access Token not found');
        return handles.UNAUTHORIZED(res, 'Access Token not found', null);
    } else {
        Users.findOne({
            where: {token: req.user.token}
        }).then(user => {
            if(user) {
                req.user = user.toJSON();
                return next();
            } else {
                log.error('No user found');
                return handles.BAD_REQUEST(res, 'No user found', null);
            }
        }).catch(err => {
            log.error('Access Token is invalid');
            return handles.UNAUTHORIZED(res, 'Access Token is Invalid', err.toJSON());
        })
    }
};