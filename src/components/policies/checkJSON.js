'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const checkit = require('checkit');
const handles = require('../services/response');
const log = require('../../utils/logging');

/*=====  End of MODULES  ======*/

/**
 * Middleware filter to verify an active user is provided
 * @param {JSON} rules rule to check against
 */
module.exports = function checkJSON(rules) {
    return (req, res, next) => {
        const Checkit = new checkit(rules);

        Checkit.run(req.body).then(() => {
            return next();
        }).catch(checkit.Error, err => {
            log.error(err.toJSON());
            return handles.BAD_REQUEST(res, 'Insufficient Params', err.toJSON());
        })
    }
};