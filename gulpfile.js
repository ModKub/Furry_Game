var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync").create();
// var autoprefixer = require("gulp-autoprefixer");



var handleError = function(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('serve', function() {
    browserSync.init({
        server: './',
        notify: false
    });

});

gulp.task("sass", function() {
    return gulp.src("src/scss/main.scss")
        .pipe(plumber({
            errorHandler: handleError
        }))
        // .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expand"
        }))
        // .pipe(autoprefixer({
        //     browsers: ['> 1%']
        // }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }))

});

gulp.task("watch", function() {
    gulp.watch("./src/scss/**/*.scss", ['sass'])
    gulp.watch("*.html").on('change', browserSync.reload);

});

gulp.task("default", function() {
    gulp.start(['serve', 'sass', 'watch']);


});
