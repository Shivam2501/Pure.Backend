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

    /**
     * Create a new account for user
     */
    router.post('/signup', checkit(rules.UserSignup), user.signup.bind(user));

    /**
     * Login a user
     */
    router.post('/login', checkit(rules.UserLogin), passport.authenticate('local'), user.login.bind(user));

    /**
     * Verify an email address
     */
    router.get('/verify-email/:token', user.verifyEmail.bind(user));

    /**
     * Resend a verification email
     */
    router.get('/resend-email/:email', user.resendVerificationEmail.bind(user));

    /**
     * Logout a user
     */
    router.get('/logout', jwtAuth, sessionAuth, user.logout.bind(user));

    /**
     * Return the logged in user
     */
    router.get('/user', jwtAuth, sessionAuth, user.getUser.bind(user));

    /**
     * Update the logged in user
     */
    router.put('/user', jwtAuth, sessionAuth, user.updateUser.bind(user));

    /**
     * Update the password of a logged in user
     */
    router.put('/update-password', checkit({password: ['required', 'minLength:5']}), jwtAuth, sessionAuth, user.updatePassword.bind(user));

    /**
     * Send reset password email to the user
     */
    router.get('/forgot-password/:email', user.forgotPassword.bind(user));

    /**
     * Reset the password using the token
     */
    router.get('/reset-password/:token', user.resetPassword.bind(user));

    /*=====  End of ROUTES  ======*/

    return router;
};