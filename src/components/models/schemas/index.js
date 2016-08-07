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

/*=====  End of MODELS  ======*/

class Models {
    constructor() {
        this.Users = Users(sequelize);
        this.EmailVerifications = EmailVerifications(sequelize);
    }
}

module.exports = (new Models());