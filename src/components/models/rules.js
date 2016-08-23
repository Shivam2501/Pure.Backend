/**
 * Created by shivambharuka on 8/4/16.
 */
'use strict';

module.exports = {

    UserSignup: {
        email: ['required', 'email'],
        password: ['required', 'minLength:5'],
        firstName: 'required',
        lastName: 'required',
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
    ],

    MenteeFields: [
        'netID',
        'schoolYear',
        'gpa',
        'workExperience',
        'researchGoal',
        'term',
        'major'
    ],

    MentorFields: [
        'aboutMe',
        'project',
        'coursework',
        'term',
        'major'
    ]
};