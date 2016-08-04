/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

module.exports = {

    UserSignup: {
        email: ['required', 'email'],
        password: 'required',
        role: 'required'
    },

    UserLogin: {
        email: ['required', 'email'],
        password: 'required'
    },

    UserOmitFields: [
        'id',
        'password',
        'token'
    ]
};