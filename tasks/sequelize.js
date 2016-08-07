'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/*=====  End of MODULES  ======*/

/*=============================
 =       SEQUELIZE TASKS       =
 =============================*/


/** Runs Sequelize migrations */
gulp.task('migrate:create', plugins.shell.task([
    'sequelize migration:create'
], {
    env: {'NODE_ENV': 'development'}
}));

/** Runs Sequelize migrations */
gulp.task('migrate', plugins.shell.task([
    'sequelize db:migrate'
], {
    env: {'NODE_ENV': 'development'}
}));

/** Runs Sequelize seeders */
gulp.task('seed', plugins.shell.task([
    'sequelize db:seed:all'
], {
    env: {'NODE_ENV': 'development'}
}));

/*=====  End of SEQUELIZE TASKS  ======*/