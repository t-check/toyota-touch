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

gulp.task('server-side-concat', function(){
    return gulp.src(['src/node-server/**/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build'));
})

gulp.task('concat', ['copy-html'], function(){
    return gulp.src(['bower_components/react/react.js', 'bower_components/react/react-dom.js', 'bower_components/lodash/dist/loadash.min.js', 'src/app/**/*.js'])
        .pipe(babel({
            "plugins": ["transform-react-jsx"]
            ,compact: false
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'))
})

gulp.task('watch', function(){
    gulp.watch('src/node-server/**/*.js', ['server-side-concat']);
    gulp.watch('src/app/**/*.js', ['concat']);
    gulp.watch('src/style/**/*.less', ['less']);
})

gulp.task('default', ['watch']);