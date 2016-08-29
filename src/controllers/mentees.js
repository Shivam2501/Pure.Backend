/**
 * Created by shivambharuka on 8/9/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const async = require('async');
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

module.exports = class MenteeController {

    constructor() {
        this.Users = Models.Users;
        this.Mentees = Models.Mentees;
        this.CompletedCourses = Models.CompletedCourses;
        this.ProgressCourses = Models.ProgressCourses;
        this.MenteeSkills = Models.MenteeSkills;
        this.Applications = Models.Applications;
        this.MentorQuestions = Models.MentorQuestions;
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
        return handles.SUCCESS(res, 'Mentee Profile returned Successfully', req.mentee);
    }

    /**
     * Update Mentor Profile
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    updateProfile(req, res) {
        return this.Mentees.update(
            req.body,
            {where: {id: req.mentee.id}}
        ).then(mentee => {
            return handles.SUCCESS(res, 'Mentee Profile Updated Successfully', mentee);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Profile not Updated');
        })
    }

    /**
     * Return all the completed courses
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getCompletedCourses(req, res) {
        return this.CompletedCourses.findAll({
            where: {mentee_id: req.mentee.id}
        }).then(courses => {
            return handles.SUCCESS(res, 'Courses Returned Successfully', courses);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Courses not returned');
        })
    }

    /**
     * Add a completed course
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addCompletedCourse(req, res) {
        return this.CompletedCourses.findOrCreate({
            where: { course: req.body.course, mentee_id: req.mentee.id }
        }).then(course => {
            return handles.SUCCESS(res, 'Course Successfully Added', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Course not added');
        })
    }

    /**
     * Delete a completed course
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeCompletedCourse(req, res) {
        return this.CompletedCourses.destroy({
            where: {id: req.params.id}
        }).then(course => {
            return handles.SUCCESS(res, 'Couse Removed Successfully', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Course not removed');
        })
    }

    /**
     * Return all the courses in progress
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getProgressCourses(req, res) {
        return this.ProgressCourses.findAll({
            where: {mentee_id: req.mentee.id}
        }).then(courses => {
            return handles.SUCCESS(res, 'Courses Returned Successfully', courses);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Course not returned');
        })
    }

    /**
     * Add a course in progress
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addProgressCourse(req, res) {
        return this.ProgressCourses.findOrCreate({
            where: { course: req.body.course, mentee_id: req.mentee.id }
        }).then(course => {
            return handles.SUCCESS(res, 'Course Successfully Added', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Course not added');
        })
    }

    /**
     * Delete a course in progress
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeProgressCourse(req, res) {
        return this.ProgressCourses.destroy({
            where: {id: req.params.id}
        }).then(course => {
            return handles.SUCCESS(res, 'Couse Removed Successfully', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Course not removed');
        })
    }

    /**
     * Return all the skills
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getSkills(req, res) {
        return this.MenteeSkills.findAll({
            where: {mentee_id: req.mentee.id}
        }).then(courses => {
            return handles.SUCCESS(res, 'Skills Returned Successfully', courses);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Skills not found');
        })
    }

    /**
     * Add a skill
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addSkill(req, res) {
        return this.MenteeSkills.findOrCreate({
            where: { skill: req.body.skill, mentee_id: req.mentee.id }
        }).then(course => {
            return handles.SUCCESS(res, 'Skill Successfully Added', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Adding Skill');
        })
    }

    /**
     * Delete a skill
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeSkill(req, res) {
        return this.MenteeSkills.destroy({
            where: {id: req.params.id}
        }).then(course => {
            return handles.SUCCESS(res, 'Skill Removed Successfully', course);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Removing Skill');
        })
    }

    /**
     * Delete Application instance if failure happens in creating questions
     * @param err error
     * @param appInstance application created
     */
    _handleApplicationError(err, appInstance) {
        log.error(`Error in creating new application questions: ${err}`);
        this.Answers.destroy({ where: {application_id: appInstance.id}});
        this.Applications.destroy({ where: {id: appInstance.id}});
    }

    /**
     * Create a new application
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    createApplication(req, res) {
        return this.Applications.findOrCreate({
            where: { mentor_id: req.params.mentorID, mentee_id: req.mentee.id }
        }).spread((app, created) => {
            const appInstance = app.get({ plain: true });
            // Get all the questions for the mentor whose application is created.
            this.MentorQuestions.findAll({
                where: {mentor_id: req.params.mentorID}
            }).then(questions => {
                async.each(questions, (question, callback) => {
                    this.Answers.findOrCreate({
                        where: {
                            application_id: appInstance.id,
                            question_id: question.get('id')
                        }
                    }).then(() => {
                        callback(); // no parameters for success
                    }).catch(err => {
                        callback('Question could not be created'); // error message passed on failure
                    })
                }, (err) => {
                    if(err) {
                        this._handleApplicationError(err, appInstance);
                        this.Error.handler(res, err, 'Mentee: Application Question not returned');
                    }
                    else {
                        return handles.SUCCESS(res, 'Application created Successfully', app);
                    }
                })
            }).catch(err => {
                this._handleApplicationError(err, appInstance);
                this.Error.handler(res, err, 'Mentee: Application answers not created');
            });
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Creating new Application');
        })
    }

    /**
     * remove a created application
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    removeApplication(req, res) {
        this.Answers.destroy({ where: {application_id: req.params.appID}});
        this.Applications.destroy({ where: {id: req.params.appID}});
        return handles.SUCCESS(res, 'Application deleted Successfully', {});
    }

    /**
     * Return all applications created by a mentee
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getAllApplications(req, res) {
        return this.Applications.findAll({
            where: {mentee_id: req.mentee.id}
        }).then(applications => {
            return handles.SUCCESS(res, 'Applications Returned Successfully', applications);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Applications not found');
        })
    }

    /**
     * Return a created application by ID
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getApplication(req, res) {
        let query = {
            where: {
                mentee_id: req.mentee.id,
                id: req.params.appID
            },
            include: [
                {
                    model: this.Answers,
                    where: {
                        application_id: req.params.appID
                    }
                }
            ]
        };

        return this.Applications.findOne(query).then(application => {
            return handles.SUCCESS(res, 'Application Returned Successfully', application);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Applications not found');
        })
    }

    /**
     * Add an answer for a created application question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    addAnswer(req, res) {
        return this.Applications.findOne({
            where: {id: req.params.appID}
        }).then(application => {
            if(application.status === 'NOT_COMPLETED') {
                return this.Answers.update(
                    {answer: req.body.answer},
                    {where: {application_id: req.params.appID, question_id: req.params.questionID} }
                ).then(answer => {
                    return handles.SUCCESS(res, 'Answer successfully saved', answer);
                }).catch(err => {
                    this.Error.handler(res, err, 'Mentee: Saving answer');
                })
            } else {
                this.Error.handler(res, err, 'Mentee: Application already submitted');
            }
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Application not found');
        })
    }

    /**
     * Get an answer for a created application question
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getAnswer(req, res) {
        return this.Answers.findOne({
            where: {application_id: req.params.appID, question_id: req.params.questionID}
        }).then(answer => {
            if(answer) {
                return handles.SUCCESS(res, 'Answer returned Successfully', answer);
            } else {
                return handles.SUCCESS(res, 'Answer is not created yet', {});
            }
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Returning Answer');
        })
    }

    /**
     * Submit a created application which makes its status "PENDING"
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    submitApplication(req, res) {
        return this.Applications.update(
            {status: 'PENDING'},
            {where: {id: req.params.appID}}
        ).then(app => {
            return handles.SUCCESS(res, 'Application submitted successfully', app);
        }).catch(err => {
            this.Error.handler(res, err, 'Mentee: Submitting Application');
        })
    }

};