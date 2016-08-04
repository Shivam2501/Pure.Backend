'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const passport = require('passport');
const sessionAuth = require('../components/policies/sessionAuth');
const jwtAuth = require('../components/policies/jwtAuth');
const checkit = require('../components/policies/checkJSON');
const rules = require('../components/models/rules');

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

    router.post('/signup', checkit(rules.UserSignup), user.signup.bind(user));
    router.post('/login', checkit(rules.UserLogin), passport.authenticate('local'), user.login.bind(user));
    router.get('/logout', jwtAuth, sessionAuth, user.logout.bind(user));
    router.get('/user', jwtAuth, sessionAuth, user.getUser.bind(user));
    router.put('/user', jwtAuth, sessionAuth, user.updateUser.bind(user));

    /*=====  End of ROUTES  ======*/

    return router;
};