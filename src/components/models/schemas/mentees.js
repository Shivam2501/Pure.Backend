'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const completedCourse = require('./completedCourses');
const progressCourse = require('./progressCourses');
const menteeSkill = require('./menteeSkills');
const application = require('./applications');

/*=====  End of MODELS  ======*/

module.exports = function Mentees(sequelize) {

    const tablename = 'mentees';

    const Mentee = sequelize.define(tablename, {
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
        netID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        schoolYear: {
            type: Sequelize.ENUM,
            values: ['freshman', 'sophomore', 'junior', 'senior'],
            allowNull: true
        },
        gpa: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        workExperience: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        researchGoal: {
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

    Mentee.hasMany(completedCourse(sequelize), {foreignKey: 'mentee_id'});
    Mentee.hasMany(progressCourse(sequelize), {foreignKey: 'mentee_id'});
    Mentee.hasMany(menteeSkill(sequelize), {foreignKey: 'mentee_id'});
    Mentee.hasMany(application(sequelize), {foreignKey: 'mentee_id'});

    return Mentee;
};