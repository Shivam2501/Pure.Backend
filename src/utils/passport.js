/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const passport = require('passport');
const log = require('./logging');
const _ = require('lodash');
const LocalStrategy = require('passport-local');

const jwt = require('../components/services/jwToken');
const passwordEncrypt = require('../components/services/passwordEncrypt');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const Models = require('../components/models/schemas');
const Users = Models.Users;

/*=====  End of MODELS  ======*/

module.exports = function Passport(app) {

    /*==============================================
     =              PASSPORT SESSION                 =
     ===============================================*/

    passport.serializeUser((user, done) => {
        done(null, user.token);
    });

    passport.deserializeUser((token, done) => {
        Users.findOne({
            where: { token: token }
        }).then(user => {
            if(user) {
                done(null, _.omit(user.toJSON(), 'password'));
            } else {
                done(null, {});
            }
        }).catch(err => {
            log.error('Access Token is invalid');
            done(null, {});
        });
    });

    /*====== End of PASSPORT SESSION ======*/

    /*==============================================
     =            PASSPORT LOCAL STRATEGY            =
     ===============================================*/

    const localStrategy = new LocalStrategy.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        Users.findOne({
            where: {email: username}
        }).then(user => {
            if(user) {

                if(passwordEncrypt.compare(password, user.get('password'))) {
                    user.set('token', jwt.issue(username)).save().then(() => {
                        return done(null, { id: user.get('id'), token: user.get('token') }, { messge: 'Success' });
                    }).catch(err => {
                        return done(null, false, {message: 'Unable to issue token'});
                    })
                } else {
                    return done(null, false, {message: 'Incorrect Password'});
                }

            } else {
                return done(null, false, {message: `Cannot find User with email: ${username}`});
            }
        }).catch(err => {
            log.error('Invalid email');
            return done(null, false, { message: err });
        })
    });

    passport.use(localStrategy);
    /*====== End of PASSPORT LOCAL STRATEGY ======*/

};