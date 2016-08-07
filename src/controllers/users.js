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
  }

    /**
     * Send Mail for Verifying Email
     * @param user user object
     * @param cb callback on success
     * @param errCb callback on error
     */
  _sendEmailVerificationMail(user, cb, errCb) {
    this.EmailVerifications.create({
        user_id: user.id,
        token: uuid()
    }).then(emailVerf => {
        log.info(`Email Verification sent to ${user.email}`);
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
              return handles.CREATED(res, 'Successfully created new User', _.omit(user.toJSON(), rules.UserOmitFields));
          }, (err) => {
              return handles.BAD_REQUEST(res, 'Failed to send the verification Email', err);
          })
      }).catch(err => {
          return handles.BAD_REQUEST(res, 'Failed to create new User', err);
      })
  }

    /**
     * User verify email
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
  verifyEmail(req, res) {
      this.EmailVerifications.update(
          { validEmail: true },
          { where: {token: req.params.token} }
      ).then(user => {
          return handles.SUCCESS(res, 'User Email Verified Successfully', user);
      }).catch(err => {
          log.error('Token not found.');
          return handles.BAD_REQUEST(res, 'Token is not valid', err);
      })
  }

    /**
     * User log in
     * @param req express request
     * @param res express response
     * @returns {Promise} response on success/error
     */
  login(req, res) {
      this.EmailVerifications.findOne({
          where: {
              'user_id': req.user.id,
              validEmail: true
          }
      }).then(emailVerf => {
          if(emailVerf) {
              log.info('Login Successful');
              return handles.SUCCESS(res, 'User Logged in Successfully', req.user.token);
          } else {
              return handles.BAD_REQUEST(res, 'Email not verified', {});
          }
      }).catch(err => {
          return handles.BAD_REQUEST(res, 'Email Verification Not Found', err);
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
          include:[
              {
                  model: this.EmailVerifications,
                  where: {
                      validEmail: false
                  }
              }
          ]
      };

      return this.Users.findOne(query).then(user => {
          return this._sendEmailVerificationMail(user, (email) => {
              return handles.CREATED(res, 'Successfully sent new verification Email', _.omit(user.toJSON(), rules.UserOmitFields));
          }, (err) => {
              return handles.BAD_REQUEST(res, 'Failed to send the verification Email', err);
          })
      }).catch(err => {
          return handles.BAD_REQUEST(res, 'Failed to retrieve user', err);
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
      if(req.body.password) {
          return handles.BAD_REQUEST(res, 'Password field can be updated using /update-password', {});
      } else if (req.body.token || req.body.id) {
          return handles.BAD_REQUEST(res, 'Token/ID cannot be updated', {});
      } else {
          this.Users.update(
               _.omit(req.body, rules.UserOmitFields),
              { where: { id: req.user.id } }
          ).then(user => {
              return handles.SUCCESS(res, 'User Updated Successfully', user);
          }).catch(err => {
              log.error('User not found.');
              return handles.BAD_REQUEST(res, 'User not found', err);
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
      this.Users.update(
          { password: passwordEncrypt.encrypt(req.body.password) },
          { where: { id: req.user.id } }
      ).then(user => {
          return handles.SUCCESS(res, 'User Password Updated Successfully', user);
      }).catch(err => {
          log.error('User not found.');
          return handles.BAD_REQUEST(res, 'User not found', err);
      })
  }

};