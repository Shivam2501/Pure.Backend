/**
 * Created by shivambharuka on 8/9/16.
 */
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

module.exports = class MainController {

    constructor() {
        this.Users = Models.Users;
        this.Mentees = Models.Mentees;
        this.MentorQuestions = Models.MentorQuestions;
        this.Mentors = Models.Mentors;
    }

    allMentors(req, res) {
        let query = {
            include: [
                {
                    model: this.Mentors,
                    where: {
                        major: req.params.department,
                        term: req.params.term
                    }
                }
            ]
        };

        return this.Users.findAll(query).then(mentors => {
            return handles.SUCCESS(res, `Mentor in ${req.params.department} returned Successfully`, mentors);
        }).catch(err => {
            log.error(`Error in returning mentor profiles: ${err}`);
            return hanldes.BAD_REQUEST(res, 'Mentor Profiles not returned', err);
        })
    }

    /**
     * Get all Mentor Questions by ID
     * @param req express request
     * @param res express response
     * @returns {Promise} return response on success/error
     */
    getQuestions(req, res) {
        return this.MentorQuestions.findAll({
            where: {mentor_id: req.params.id}
        }).then(questions => {
            return handles.SUCCESS(res, 'Mentor Questions Returned Successfully', questions);
        }).catch(err => {
            log.error('Mentor not found.');
            return handles.BAD_REQUEST(res, 'Mentor not found', err);
        })
    }

};