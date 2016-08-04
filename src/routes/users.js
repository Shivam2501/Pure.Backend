'use strict';

/*===============================
 =            MODULES            =
 ===============================*/


/*=====  End of MODULES  ======*/

/*===============================
 =        CONTROLLERS            =
 ===============================*/

const UserController = require('../controllers/users');

/*=====  End of CONTROLLERS  ======*/

module.exports = function UserRouter() {

    const router = require('express').Router();
    const user = new UserController();

    /*===============================
     =             ROUTES            =
     ===============================*/


    /*=====  End of ROUTES  ======*/

    return router;
};