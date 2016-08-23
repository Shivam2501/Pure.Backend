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

const MenteeController = require('../controllers/mentees');

/*=====  End of CONTROLLERS  ======*/

module.exports = function MentorRouter() {

    const router = require('express').Router();
    const mentee = new MenteeController();

    /*===============================
     =             ROUTES            =
     ===============================*/

    /**
     * Return the logged in mentee
     */
    router.get('/mentee', mentee.getProfile.bind(mentee));

    /**
     * Update the logged in mentee
     */
    router.put('/mentee', mentee.updateProfile.bind(mentee));

    /**
     * Return all the completed courses
     */
    router.get('/mentee/completedCourse', mentee.getCompletedCourses.bind(mentee));

    /**
     * Add a completed course
     */
    router.put('/mentee/completedCourse', mentee.addCompletedCourse.bind(mentee));

    /**
     * Deleted an added completed course by ID
     */
    router.delete('/mentee/completedCourse/:id', mentee.removeCompletedCourse.bind(mentee));

    /**
     * Return all the courses in progress
     */
    router.get('/mentee/progressCourse', mentee.getProgressCourses.bind(mentee));

    /**
     * Add a course in progress
     */
    router.put('/mentee/progressCourse', mentee.addProgressCourse.bind(mentee));

    /**
     * Deleted an added course in progress by ID
     */
    router.delete('/mentee/progressCourse/:id', mentee.removeProgressCourse.bind(mentee));

    /**
     * Return all the skills
     */
    router.get('/mentee/skill', mentee.getSkills.bind(mentee));

    /**
     * Add a skill
     */
    router.put('/mentee/skill', mentee.addSkill.bind(mentee));

    /**
     * Delete a skill by ID
     */
    router.delete('/mentee/skill/:id', mentee.removeSkill.bind(mentee));

    /**
     * Create a new Application by mentor ID
     */
    router.post('/mentee/application/:mentorID', mentee.createApplication.bind(mentee));

    /**
     * Delete an Application by app ID
     */
    router.delete('/mentee/application/:appID', mentee.removeApplication.bind(mentee));

    /**
     * Return all applications added by a mentee
     */
    router.get('/mentee/applications', mentee.getAllApplications.bind(mentee));

    /**
     * Return an application by ID
     */
    router.get('/mentee/application/:id', mentee.getApplication.bind(mentee));

    /**
     * Add an answer for Mentor Question
     */
    router.post('/mentee/application/:appID/:questionID', mentee.addAnswer.bind(mentee));

    /**
     * Get an answer for Mentor Question
     */
    router.get('/mentee/application/:appID/:questionID', mentee.getAnswer.bind(mentee));

    /*=====  End of ROUTES  ======*/

    return router;
};