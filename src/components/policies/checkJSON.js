'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const checkit = require('checkit');
const handles = require('../services/response');
const log = require('../../utils/logging');

/*=====  End of MODULES  ======*/

/**
 * Check if body has the required elements from the rules
 * @param rules rule to check against
 * @returns {function} call next middleware or return error
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