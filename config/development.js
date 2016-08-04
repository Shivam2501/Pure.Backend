/**
 * Created by shivambharuka on 7/18/16.
 */
'use strict';

let config= {
    log: {
        filename: 'log/dumplogs.log'
    },

    database: {
        url: 'postgres://postgres:gigster@localhost:5432/pure',
        engine: 'postgres'
    },

    // secret generated using crypto npm module: node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
    session: {
        url: 'redis://localhost:6379',
        secret: 'd1451c67940500c96d0bf9b2239d418e87e69444df3df1d5f6c8fe8ce80633f4',
        jwtSecret: 'c51e8f5539293bdf4ff8f699ab29c6bd85544cd5b44e0dc96950f2eaa36a8cb1'
    }
};

module.exports = config;
