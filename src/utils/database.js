/**
 * Created by shivambharuka on 7/18/16.
 */
'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const Sequelize = require('sequelize');
const _ = require('lodash');
const dbConfig = require('../../config').database;

/*=====  End of MODULES  ======*/

class Database {
    constructor() {
        this.instance = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            _.assignIn({host: dbConfig.host, dialect: dbConfig.dialect}, {
                pool: {
                    max: 10,
                    min: 2,
                    idle: 0
                }
            })
        );
    }
}

module.exports = (new Database().instance);