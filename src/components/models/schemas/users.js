'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');

/*=====  End of MODULES  ======*/

/*===============================
 =            MODELS             =
 ===============================*/

const emailVerification = require('./emailVerifications');

/*=====  End of MODELS  ======*/

module.exports = function Users(sequelize) {

    const tablename = 'users';

    const User = sequelize.define(tablename, {
        id: {
            type:          Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey:    true
        },
        email: {
            type:      Sequelize.STRING,
            allowNull: false,
            unique:    true,
            validate:  {
                isEmail: true
            }
        },
        password: {
            type:      Sequelize.STRING,
            allowNull: false
        },
        token: {
            type:      Sequelize.STRING,
            allowNull: false,
            unique:    true
        },
        firstName: {
            type:      Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type:      Sequelize.STRING,
            allowNull: true
        },
        role: {
            type:       Sequelize.ENUM,
            values:     ['admin', 'mentee', 'mentor'],
            allowNull:  false
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

    User.hasOne(emailVerification(sequelize), { foreignKey: 'user_id' });

    return User;
};