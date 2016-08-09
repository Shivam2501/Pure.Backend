'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const mentorQuestion = require('./mentorQuestions');

/*=====  End of MODELS  ======*/

module.exports = function Mentors(sequelize) {

    const tablename = 'mentors';

    const Mentor = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        'user_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        aboutMe: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        project: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        coursework: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        term: {
            type: Sequelize.STRING,
            allowNull: true
        },
        major: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    Mentor.hasMany(mentorQuestion(sequelize), {foreignKey: 'mentor_id'});

    return Mentor;
};