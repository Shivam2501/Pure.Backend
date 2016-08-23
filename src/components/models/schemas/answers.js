'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

/*=====  End of MODELS  ======*/

module.exports = function Answers(sequelize) {

    const tablename = 'answers';

    const Answer = sequelize.define(tablename, {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        'application_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'applications',
                key: 'id'
            }
        },
        'question_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'mentorQuestions',
                key: 'id'
            }
        },
        answer: {
            type: Sequelize.TEXT,
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

    return Answer;
};