'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const sessionAuth = require('../components/policies/sessionAuth');
const jwtAuth = require('../components/policies/jwtAuth');
const checkit = require('../components/policies/checkJSON');
const rules = require('../components/models/rules');

/*=====  End of MODULES  ======*/

/*===============================
 =        CONTROLLERS            =
 ===============================*/

const MainController = require('../controllers/main');

/*=====  End of CONTROLLERS  ======*/

module.exports = function MainRouter() {

    const router = require('express').Router();
    const main = new MainController();

    /*===============================
     =             ROUTES            =
     ===============================*/

    /**
     * Get all questions
     */
    router.get('/mentors/question/:id', main.getQuestions.bind(main));

    /**
     * Get all mentors by department for a term
     */
    router.get('/mentors/:term/:department', main.allMentors.bind(main));

    /*=====  End of ROUTES  ======*/

    return router;
};