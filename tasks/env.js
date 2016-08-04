'use strict';

/*===============================
 =            MODULES            =
 ===============================*/

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/*=====  End of MODULES  ======*/

/*=============================
 =       ENV TASKS             =
 =============================*/

gulp.task('start:dev', () => {
    plugins.nodemon({
        script: 'src/server.js',
        env: {'NODE_ENV': 'development'}
    }).on('restart', () => {
        console.log('Restarted');
    })
});

gulp.task('start:stag', () => {

});

gulp.task('start:prod', () => {

});

/*=====  End of ENV TASKS  ======*/