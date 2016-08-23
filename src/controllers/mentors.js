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
        return handles.SUCCESS(res, 'Mentor Profile returned Successfully', req.mentor);
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
            {where: {id: req.mentor.id}}
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
        return this.MentorQuestions.create(_.assign(req.body, {mentor_id: req.mentor.id})).then(mentor => {
            return handles.SUCCESS(res, 'Mentor Question Successfully Created', mentor);
        }).catch(err => {
            return handles.BAD_REQUEST(res, 'Error in creating Question', err);
        })
    }

    /**
     * Update a Question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateQuestion(req, res) {
        return this.MentorQuestions.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(mentor => {
            return handles.SUCCESS(res, 'Mentor Question Updated Successfully', mentor);
        }).catch(err => {
            log.error('Mentor Question not found.');
            return handles.BAD_REQUEST(res, 'Mentor Question not found', err);
        })
    }

    /**
     * Remove a Question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeQuestion(req, res) {
        return this.MentorQuestions.destroy({
            where: {id: req.params.id}
        }).then(mentor => {
            return handles.SUCCESS(res, 'Mentor Question Deleted Successfully', mentor);
        }).catch(err => {
            log.error('Mentor Question not found.');
            return handles.BAD_REQUEST(res, 'Mentor Question not found', err);
        })

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