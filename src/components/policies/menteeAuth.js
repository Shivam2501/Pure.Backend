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
const Mentees = Models.Mentees;

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
        Mentees.findOne({
            where: {user_id: req.user.id}
        }).then(mentee => {
            if(mentee) {
                req.mentee = mentee.toJSON();
                return next();
            } else {
                return handles.UNAUTHORIZED(res, 'Mentee not found', null);
            }
        }).catch(err => {
            return handles.UNAUTHORIZED(res, 'Mentee not found', null);
        });
    }
};