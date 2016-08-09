'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const handles = require('../components/services/response');
const log = require('../utils/logging');
const rules = require('../components/models/rules');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Models = require('../components/models/schemas');

/*=====  End of MODELS  ======*/

module.exports = class MentorController {

    constructor() {
        this.Users = Models.Users;
        this.Mentors = Models.Mentors;
        this.MentorQuestions = Models.MentorQuestions;
    }

    /**
     * Get Mentor Profile
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getProfile(req, res) {
        return this.Mentors.findOne({
            where: {user_id: req.user.id}
        }).then(mentor => {
            if (mentor) {
                return handles.SUCCESS(res, 'Mentor Profile returned Successfully', mentor.toJSON());
            } else {
                return handles.BAD_REQUEST(res, 'Mentor Profile not found', err);
            }
        }).catch(err => {
            return handles.BAD_REQUEST(res, 'Mentor Profile not found', err);
        })
    }

    /**
     * Update Mentor Profile
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateProfile(req, res) {
        return this.Mentors.update(
            req.body,
            {where: {user_id: req.user.id}}
        ).then(mentor => {
            return handles.SUCCESS(res, 'Mentor Profile Updated Successfully', mentor);
        }).catch(err => {
            log.error('Mentor Profile not found.');
            return handles.BAD_REQUEST(res, 'Mentor Profile not found', err);
        })
    }

    /**
     * Add a Question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addQuestion(req, res) {

    }

    /**
     * Update a Question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateQuestion(req, res) {

    }

    /**
     * Remove a Question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeQuestion(req, res) {

    }

    /**
     * Get all Questions
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getQuestions(req, res) {

    }

    /**
     * Return all received Applications
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    receivedApplications(req, res) {

    }

    /**
     * Update Application Status
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateApplicationStatus(req, res) {

    }
};