'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const answers = require('./answers');

/*=====  End of MODELS  ======*/

module.exports = function MentorQuestions(sequelize) {

    const tablename = 'mentorQuestions';

    const MentorQuestion = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        'mentor_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'mentors',
                key: 'id'
            }
        },
        question: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        required: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
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

    MentorQuestion.hasOne(answers(sequelize), {foreignKey: 'question_id'});
    return MentorQuestion;
};