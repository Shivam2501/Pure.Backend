'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const sequelize = require('../../../utils/database');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Users = require('./users');
const EmailVerifications = require('./emailVerifications');
const ResetPasswords = require('./resetPasswords');
const Mentors = require('./mentors');
const MentorQuestions = require('./mentorQuestions');
const Mentees = require('./mentees');
const CompletedCourses = require('./completedCourses');
const ProgressCourses = require('./progressCourses');
const MenteeSkills = require('./menteeSkills');
const Applications = require('./applications');
const Answers = require('./answers');
const Timelines = require('./timeline');
const TimelineEvents = require('./timelineEvent');
const Announcements = require('./announcement');

/*=====  End of MODELS  ======*/

class Models {
    constructor() {
        this.Users = Users(sequelize);
        this.EmailVerifications = EmailVerifications(sequelize);
        this.ResetPasswords = ResetPasswords(sequelize);
        this.Mentors = Mentors(sequelize);
        this.MentorQuestions = MentorQuestions(sequelize);
        this.Mentees = Mentees(sequelize);
        this.CompletedCourses = CompletedCourses(sequelize);
        this.ProgressCourses = ProgressCourses(sequelize);
        this.MenteeSkills = MenteeSkills(sequelize);
        this.Applications = Applications(sequelize);
        this.Answers = Answers(sequelize);
        this.Timelines = Timelines(sequelize);
        this.TimelineEvents = TimelineEvents(sequelize);
        this.Announcements = Announcements(sequelize);
    }
}

module.exports = (new Models());