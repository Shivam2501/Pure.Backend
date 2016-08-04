/**
 * Created by shivambharuka on 7/18/16.
 */

/*===============================
 =            MODULES            =
 ===============================*/

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/*=====  End of MODULES  ======*/

/** Setup all the required paths for reuse */
const paths = {
    assets:     `${__dirname}/../assets/**/*`,
    scripts:    `${__dirname}/../src/**/*`,
    test:       `${__dirname}/../tests/**/*`,
    karma:      `${__dirname}/../karma.conf.js`
};

/*=============================
 =       Lint TASKS         =
 =============================*/

gulp.task('jshint', () => {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(plugins.stylish))
        .pipe(plugins.notify({
            title:   'JSHint',
            message: 'JSHint Successfully Passed.'
        }))
});

gulp.task('eslint', () => {
    return gulp.src(paths.scripts)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError())
        .pipe(plugins.notify({
            title:   'ESLint',
            message: 'ESLint Successfully Passed'
        }))
});

gulp.task('lint', [ 'jshint', 'eslint' ]);

/*=====  End of Lint TASKS  ======*/