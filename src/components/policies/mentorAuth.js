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
const Mentors = Models.Mentors;

/*=====  End of MODELS  ======*/

/**
 * Middleware filter to verify an active user is provided
 * @param  {Object}   req  HTTP request
 * @param  {Object}   res  HTTP response
 * @param  {Function} next filter chain
 */
module.exports = (req, res, next) => {
    if (!req.user) {
        log.error('User not found');
        return handles.UNAUTHORIZED(res, 'User not found', null);
    } else {
        Mentors.findOne({
            where: {user_id: req.user.id}
        }).then(mentor => {
            if(mentor) {
                req.mentor = mentor.toJSON();
                return next();
            } else {
                return handles.UNAUTHORIZED(res, 'Mentor not found', null);
            }
        }).catch(err => {
            return handles.UNAUTHORIZED(res, 'Mentor not found', null);
        });
    }
};