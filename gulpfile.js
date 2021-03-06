let del = require('del')
let gulp = require('gulp')
let ts = require('gulp-typescript')
let mocha = require('gulp-mocha')

const tsProject = ts.createProject('tsconfig.json')


gulp.task('clean', function () {
    return del(['dist/*'])
})

gulp.task('compile', gulp.series('clean', function compile_func(done) {
    return tsProject.src()
        .pipe(tsProject())
        .on('error', function () {
            done('TS compile fail')
        })
        .js.pipe(gulp.dest('dist'))
}))

gulp.task('test', gulp.series('compile', function test_func() {
    return gulp.src(['dist/test/**/**.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }))
}))