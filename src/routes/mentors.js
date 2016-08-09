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

const MentorController = require('../controllers/mentors');

/*=====  End of CONTROLLERS  ======*/

module.exports = function MentorRouter() {

    const router = require('express').Router();
    const mentor = new MentorController();

    /*===============================
     =             ROUTES            =
     ===============================*/

    /**
     * Return the logged in mentor
     * @param req express request
     * @param res express response
     */
    router.get('/mentor', mentor.getProfile.bind(mentor));


    /**
     * Update the logged in mentor
     * @param req express request
     * @param res express response
     */
    router.put('/mentor', mentor.updateProfile.bind(mentor));

    /**
     * Create a new question
     * @param req express request
     * @param res express response
     */
    router.post('/question', mentor.addQuestion.bind(mentor));

    /**
     * Update a question
     * @param req express request
     * @param res express response
     */
    router.put('/question', mentor.updateQuestion.bind(mentor));

    /**
     * Delete a question
     * @param req express request
     * @param res express response
     */
    router.delete('/question', mentor.removeQuestion.bind(mentor));

    /**
     * Get all questions
     * @param req express request
     * @param res express response
     */
    router.get('/question', mentor.getQuestions.bind(mentor));

    /*=====  End of ROUTES  ======*/

    return router;
};