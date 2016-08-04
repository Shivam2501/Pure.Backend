'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Models = require('../components/models/schemas');

/*=====  End of MODULES  ======*/

module.exports = class UserController {
  constructor() {
    this.Users = Models.Users;
  }
};