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

/*=====  End of MODELS  ======*/

class Models {
    constructor() {
        this.Users = Users(sequelize);
    }
}

module.exports = (new Models());