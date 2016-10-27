var gulp         = require('gulp');
var babel        = require('gulp-babel');
var concat       = require('gulp-concat');
var less = require('gulp-less');


gulp.task('copy-html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
})

gulp.task('less', function () {
  return gulp.src('src/style/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css/css.css'));
});

gulp.task('concat', ['copy-html'], function(){
    return gulp.src(['bower_components/react/react.js', 'bower_components/react/react-dom.js', 'src/**/*.js'])
        .pipe(babel({
            "plugins": ["transform-react-jsx"]
            ,compact: false
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'))
})

gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['concat']);
    gulp.watch('src/style/**/*.less', ['less']);
})

gulp.task('default', ['watch']);