'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

module.exports = function EmailVerifications(sequelize) {

    const tablename = 'emailVerifications';

    const EmailVerification = sequelize.define(tablename, {
        id: {
            type:          Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        'user_id': {
            type:          Sequelize.BIGINT,
            allowNull:     false,
            references:    {
                model: 'users',
                key:   'id'
            }
        },
        token: {
            type:      Sequelize.UUID,
            allowNull: false,
            unique:    true,
            validate:  {
                isUUID: 4
            }
        },
        validEmail: {
            type:      Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type:         Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull:    false
        },
        updatedAt: {
            type:         Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull:    false
        }
    }, {
        timestamps: true
    });

    return EmailVerification;
};