'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const requireDir = require('require-dir');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/*=====  End of MODULES  ======*/

requireDir('./tasks');

/*=============================
 =        MAIN TASKS           =
 =============================*/

gulp.task('default', [ 'nsp' , 'lint' ]);

/*=====  End of MAIN TASKS  ======*/