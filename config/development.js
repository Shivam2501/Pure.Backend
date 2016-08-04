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

    session: {
        url: 'redis://localhost:6379',
        secret: 'o2Jc8iW8Ce9R1kMlyRt1Yw3HWF06z5B6'
    }
};

module.exports = config;
