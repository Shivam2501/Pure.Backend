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

/*=====  End of MODELS  ======*/

class Models {
    constructor() {
        this.Users = Users(sequelize);
        this.EmailVerifications = EmailVerifications(sequelize);
        this.ResetPasswords = ResetPasswords(sequelize);
        this.Mentors = Mentors(sequelize);
        this.MentorQuestions = MentorQuestions(sequelize);
    }
}

module.exports = (new Models());