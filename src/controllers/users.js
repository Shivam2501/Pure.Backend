'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const uuid = require('../components/services/uuid');
const handles = require('../components/services/response');
const passwordEncrypt = require('../components/services/passwordEncrypt');
const log = require('../utils/logging');
const rules = require('../components/models/rules');
const jwt = require('../components/services/jwToken');
const email = require('../components/services/mail');
const error = require('./error');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Models = require('../components/models/schemas');

/*=====  End of MODELS  ======*/

module.exports = class UserController {

    constructor() {
        this.Users = Models.Users;
        this.EmailVerifications = Models.EmailVerifications;
        this.ResetPasswords = Models.ResetPasswords;
        this.Mentors = Models.Mentors;
        this.Mentees = Models.Mentees;
        this.Error = new error();
    }

    /**
     * Send Mail for Verifying Email
     * @param user user object
     * @param cb callback on success
     * @param errCb callback on error
     */
    _sendEmailVerificationMail(user, cb, errCb) {

        // Remove the previous generated email so that the previous token is invalid
        this.EmailVerifications.destroy({
            where: {user_id: user.id}
        });

        this.EmailVerifications.create({
            user_id: user.id,
            token: uuid()
        }).then(emailVerf => {
            log.info(`Email Verification sending to ${user.email}`);
            email(user.email, 'Please verify your email', `
            <p>Welcome to PURE Community. Please verify your email.</p><br/>
            <a href="http://localhost:3000/users/verify-email/${emailVerf.token}">Verify Email</a><br/>
            `, null).then((info) => {
                cb(info);
            }).catch(err => {
                log.error('Error in sending verification email');
                errCb(err);
            });
        }).catch(err => {
            errCb(err);
        })
    }

    /**
     * Send Mail for Reset Password
     * @param user user object
     * @param cb callback on success
     * @param errCb callback on error
     */
    _sendPasswordResetMail(user, cb, errCb) {

        // Remove the previous generated email so that the previous token is invalid
        this.ResetPasswords.destroy({
            where: {user_id: user.id}
        });

        this.ResetPasswords.create({
            user_id: user.id,
            token: uuid()
        }).then(passVerf => {
            log.info(`Reset Password email sent to ${user.email}`);
            email(user.email, 'Reset Password', `
        <p>Please click the link below to reset your password.</p><br/>
        <a href="http://localhost:3000/users/reset-password/${passVerf.token}">Reset Password</a><br/>
        `, null).then((info) => {
                cb(info);
            }).catch(err => {
                log.error('Error in sending reset password email');
                errCb(err);
            });
        }).catch(err => {
            errCb(err);
        })
    }

    /**
     * Handle Error in Signup
     * @param user user created
     * @param err error
     */
    _handleErrorSignup(user, err) {
        log.error(err);
        this.EmailVerifications.destroy({ where: {user_id: user.id} });
        this.Users.destroy({ where: {id: user.id} });
    }

    /**
     * User sign up
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    signup(req, res) {
        req.body.password = passwordEncrypt.encrypt(req.body.password);
        req.body.token = jwt.issue(req.body.email);

        return this.Users.create(req.body).then(user => {
            return this._sendEmailVerificationMail(user, (email) => {
                if (req.body.role === 'mentor') {
                    return this.Mentors.create({
                        user_id: user.id
                    }).then(mentor => {
                        return handles.CREATED(res, 'Successfully created new Mentor', _.omit(user.toJSON(), rules.UserOmitFields));
                    }).catch(err => {
                        this._handleErrorSignup(user, err);
                        this.Error.handler(res, err, 'User: Creating');
                    })
                } else if (req.body.role === 'mentee') {
                    return this.Mentees.create({
                        user_id: user.id
                    }).then(mentee => {
                        return handles.CREATED(res, 'Successfully created new Mentee', _.omit(user.toJSON(), rules.UserOmitFields));
                    }).catch(err => {
                        this._handleErrorSignup(user, err);
                        this.Error.handler(res, err, 'User: Creating');
                    })
                }else {
                    return handles.CREATED(res, 'Successfully created new User', _.omit(user.toJSON(), rules.UserOmitFields));
                }
            }, (err) => {
                this._handleErrorSignup(user, err);
                this.Error.handler(res, err, 'User: Creating');
            })
        }).catch(err => {
            this.Error.handler(res, err, 'User: Creating');
        })
    }

    /**
     * User verify email
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    verifyEmail(req, res) {
        return this.EmailVerifications.update(
            {validEmail: true},
            {where: {token: req.params.token}}
        ).spread((affectedCount, affectedRows) => {
            if (affectedCount) {
                return handles.SUCCESS(res, 'User Email Verified Successfully', {});
            } else {
                this.Error.handler(res, {}, 'User: Token not Valid');
            }
        }).catch(err => {
            this.Error.handler(res, err, 'User: Token not Valid');
        })
    }

    /**
     * User log in
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    login(req, res) {
        return this.EmailVerifications.findOne({
            where: {
                'user_id': req.user.id,
                validEmail: true
            }
        }).then(emailVerf => {
            if (emailVerf) {
                log.info('Login Successful');
                return handles.SUCCESS(res, 'User Logged in Successfully', req.user.token);
            } else {
                this.Error.handler(res, {}, 'User: Email not Verified');
            }
        }).catch(err => {
            this.Error.handler(res, err, 'User: Verification email not found');
        })
    }

    /**
     * Resend the verification email
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    resendVerificationEmail(req, res) {
        let query = {
            where: {
                email: req.params.email
            },
            include: [
                {
                    model: this.EmailVerifications,
                    where: {
                        validEmail: false //don't send a verification email if the account is already verified
                    }
                }
            ]
        };

        return this.Users.findOne(query).then(user => {
            return this._sendEmailVerificationMail(user, (email) => {
                return handles.CREATED(res, 'Successfully sent new verification Email', _.omit(user.toJSON(), rules.UserOmitFields));
            }, (err) => {
                this.Error.handler(res, err, 'User: Sending Verification Mail');
            })
        }).catch(err => {
            this.Error.handler(res, err, 'User: Finding User');
        })
    }

    /**
     * User logout
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    logout(req, res) {
        req.session.regenerate(err => {
            log.debug(`Logout Successful for User: ${req.user.email}`);
            return handles.SUCCESS(res, 'User Logged Out Successfully');
        });
    }

    /**
     * User get object
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    getUser(req, res) {
        return handles.SUCCESS(res, 'User Returned Successfully', _.omit(req.user, rules.UserOmitFields));
    }

    /**
     * User update
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    updateUser(req, res) {
        if (req.body.password) {
            this.Error.handler(res, {}, 'User: Password field can be updated using /update-password');
        } else if (req.body.token || req.body.id) {
            this.Error.handler(res, {}, 'User: Token cannot be found');
        } else {
            return this.Users.update(
                _.omit(req.body, rules.UserOmitFields),
                {where: {id: req.user.id}}
            ).then(user => {
                return handles.SUCCESS(res, 'User Updated Successfully', user);
            }).catch(err => {
                this.Error.handler(res, err, 'User: User not Found');
            })
        }
    }

    /**
     * User update password
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    updatePassword(req, res) {
        return this.Users.update(
            {password: passwordEncrypt.encrypt(req.body.password)},
            {where: {id: req.user.id}}
        ).then(user => {
            return handles.SUCCESS(res, 'User Password Updated Successfully', user);
        }).catch(err => {
            this.Error.handler(res, err, 'User: User not Found');
        })
    }

    /**
     * Send Reset Password Email
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    forgotPassword(req, res) {
        return this.Users.findOne({
            where: {email: req.params.email}
        }).then(user => {
            return this._sendPasswordResetMail(user, (email) => {
                return handles.CREATED(res, 'Successfully sent the Reset Password Email', {});
            }, (err) => {
                this.Error.handler(res, err, 'User: Failed to send the reset password email');
            })
        }).catch(err => {
            this.Error.handler(res, err, 'User: User not Found');
        })
    }

    /**
     * Reset Password
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
    resetPassword(req, res) {
        return this.ResetPasswords.findOne({
            where: {token: req.params.token}
        }).then(resetPass => {
            if (resetPass) {
                return this.Users.findOne({
                    where: {id: resetPass.user_id}
                }).then(user => {
                    return res.redirect(`http://localhost:3000/app?token=${user.token}`);
                }).catch(err => {
                    this.Error.handler(res, err, 'User: User not Found');
                });
            } else {
                this.Error.handler(res, {}, 'User: Token not Found');
            }
        }).catch(err => {
            this.Error.handler(res, err, 'User: Token not Found');
        })
    }

};