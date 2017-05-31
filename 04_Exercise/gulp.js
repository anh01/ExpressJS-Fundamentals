/**
 * Created by Toni on 5/29/2017.
 */
let gulp = require('gulp');
let htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});