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
     */
    router.get('/mentor', mentor.getProfile.bind(mentor));


    /**
     * Update the logged in mentor
     */
    router.put('/mentor', mentor.updateProfile.bind(mentor));

    /**
     * Create a new question
     */
    router.post('/question', checkit({question: ['required']}), mentor.addQuestion.bind(mentor));

    /**
     * Update a question by id
     */
    router.put('/question/:id', checkit({question: ['required']}), mentor.updateQuestion.bind(mentor));

    /**
     * Delete a question by id
     */
    router.delete('/question/:id', mentor.removeQuestion.bind(mentor));

    /**
     * See all received applications
     */
    router.get('/application', mentor.receivedApplications.bind(mentor));

    /**
     * Update an application status
     */
    router.post('/application/:appID', mentor.updateApplicationStatus.bind(mentor));

    /*=====  End of ROUTES  ======*/

    return router;
};