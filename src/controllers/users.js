'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const _ = require('lodash');
const handles = require('../components/services/response');
const passwordEncrypt = require('../components/services/passwordEncrypt');
const log = require('../utils/logging');
const rules = require('../components/models/rules');
const jwt = require('../components/services/jwToken');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Models = require('../components/models/schemas');

/*=====  End of MODELS  ======*/

module.exports = class UserController {

  constructor() {
    this.Users = Models.Users;
  }

  signup(req, res) {
      req.body.password = passwordEncrypt.encrypt(req.body.password);
      req.body.token = jwt.issue(req.body.email);

      return this.Users.create(req.body).then(user => {
          return handles.CREATED(res, 'Successfully created new User', _.omit(user.toJSON(), rules.UserOmitFields));
      }).catch(err => {
          return handles.BAD_REQUEST(res, 'Failed to create new User', err);
      })
  }

  login(req, res) {
      log.info('Login Successfully');
      return handles.SUCCESS(res, 'User Logged in Successfully', _.omit(req.user, rules.UserOmitFields));
  }

  logout(req, res) {
      req.session.regenerate(err => {
          log.debug(`Logout Successful for User: ${req.user.email}`);
          res.redirect('/logout/success');
      });
  }

  getUser(req, res) {
      return handles.SUCCESS(res, 'User Returned Successfully', _.omit(req.user, rules.UserOmitFields));
  }

  updateUser(req, res) {

  }

};