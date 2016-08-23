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

module.exports = function Applications(sequelize) {

    const tablename = 'applications';

    const Application = sequelize.define(tablename, {
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
        'mentee_id': {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'mentees',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: ['ACCEPTED', 'DECLINED', 'PENDING', 'NOT_COMPLETED'],
            defaultValue: 'NOT_COMPLETED',
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

    Application.hasMany(answers(sequelize), {foreignKey: 'application_id'});

    return Application;
};