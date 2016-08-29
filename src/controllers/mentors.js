'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const handles = require('../components/services/response');
const log = require('../utils/logging');
const rules = require('../components/models/rules');
const error = require('./error');

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
        this.Applications = Models.Applications;
        this.Answers = Models.Answers;
        this.Error = new error();
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
            this.Error.handler(res, err, 'Mentor: Profile could not be found');
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
            this.Error.handler(res, err, 'Mentor: Answer could not be added');
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
            this.Error.handler(res, err, 'Mentor: Question could not be updated');
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
            this.Error.handler(res, err, 'Mentor: Question Not Deleted Successfully');
        })

    }

    /**
     * Return all received Applications
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    receivedApplications(req, res) {
        return this.Applications.findAll({
            where: {mentor_id: req.mentor.id, status: {$not: "NOT_COMPLETED"}}
        }).then(applications => {
            return handles.SUCCESS(res, 'Applications Returned Successfully', applications);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentor: Applications not found');
        })
    }

    /**
     * Update Application Status
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateApplicationStatus(req, res) {
        return this.Applications.update(
            {status: req.body.status},
            {where: {id: req.params.appID, mentor_id: req.mentor.id}}
        ).then(app => {
            if(app[0]) {
                return handles.SUCCESS(res, 'Application updated successfully', app);
            } else {
                this.Error.handler(res, {}, 'Mentor: Application could not be found');
            }
        }).catch(err => {
            this.Error.handler(res, err, 'Mentor: Application could not be updated');
        })
    }
};