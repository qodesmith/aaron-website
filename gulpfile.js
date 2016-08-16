// Generic Utilities:
// -----------------
var gulp       = require('gulp');
var concat     = require('gulp-concat-util'); // Makes concat.header, concat.footer available.
var Afplay     = require('afplay');
var player     = new Afplay();

// JavaScript Utilities:
// --------------------
var uglify     = require('gulp-uglify');
var eslint     = require('gulp-eslint');

// CSS Utilities:
// -------------
var cssnano    = require('gulp-cssnano');
var less       = require('gulp-less');
var prefix     = require('gulp-autoprefixer');
var cmq        = require('gulp-combine-mq');

// Handlerbars Templating:
// ----------------------
var handlebars = require('gulp-handlebars');
var wrap       = require('gulp-wrap');
var declare    = require('gulp-declare');

/************************************************/
/************************************************/
/************************************************/

// HANDLEBARS
gulp.task('handlebars', function() {
  return gulp.src('dev/templates/**/*.hbs')
    .pipe(handlebars({
      // Needed to avoid mismatching compiler with runtime.
      // https://github.com/lazd/gulp-handlebars#compiling-using-a-specific-handlebars-version
      handlebars: require('handlebars')
    }))
    .on('error', onError)
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .on('error', onError)
    .pipe(declare({
      root: 'templates', // Where to access the templates from.
      noRedeclare: true
    }))
    .on('error', onError)
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dev/js'));
});

// JAVASCRIPT: DEPENDENCIES
gulp.task('dependencies', function() {
  return gulp.src([
    // jQuery build via console:
    // grunt custom:-css,-deprecated,-dimensions,-effects,-event,-offset,-wrap,-core/ready,-exports/amd,-sizzle
    'dev/dependencies/first.js', // Anything that absolutely needs to be 1st.
    'dev/dependencies/jquery.min.js', // Custom build: https://goo.gl/I8x3Q
    'dev/dependencies/underscore-min.js', // Downloaded.
    'dev/dependencies/backbone-min.js', // Downloaded.
    'node_modules/handlebars/dist/handlebars.runtime.min.js',
    'node_modules/typer-js/typer.js',
    'node_modules/thing-to-html/thingToHTML.js',
    'node_modules/time-calculator/time-calculator.js',
    'node_modules/background-image-gallery/BGimageGallery.js'
  ])
    .pipe(concat('dependencies.min.js'))
    .pipe(gulp.dest('dev/dependencies'));
});

// JAVASCRIPT: CONCATENATION
gulp.task('scripts', function() {
  return gulp.src([
    'dev/dependencies/dependencies.min.js', // Dependencies 1st.
    'dev/js/models/**/*.js', // Models before views & collections.
    'dev/js/**/!(app|templates)*.js',
    'dev/js/templates.js',
    'dev/js/app.js'
  ])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('public'));
});

// JAVASCRIPT: ESLINT
gulp.task('lint', function() {
  // https://github.com/adametry/gulp-eslint
  return gulp.src('dev/js/**/!(templates)*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(function(res) {
      if (res.errorCount) {
        player.play('/System/Library/Sounds/Funk.aiff');
      }
    }));
});

// CSS: LESS
gulp.task('less', function() {
  return gulp.src([
      'dev/less/global.less', // Must be 1st.
      'dev/less/**/*.less',
      'node_modules/typer-js/less/typer.less',
      'node_modules/thing-to-html/thing.less',
      'node_modules/background-image-gallery/BGimageGallery.css'
    ])
    .pipe(concat('styles.less'))
    .pipe(less()) // styles.less > styles.css
    .on('error', onError)
    .pipe(prefix({browsers: ['last 2 versions']})) // browserslist: https://github.com/ai/browserslist
    .on('error', onError)
    .pipe(cmq({beautify: true}))
    .on('error', onError)
    .pipe(gulp.dest('public'));
});

// PRODUCTION: JS IIFE, JS & SYLES MINIFICATION
gulp.task('productionize-js', function() {
  return gulp.src('public/all.min.js')
    .pipe(concat.header('(function(){'))
    .pipe(concat.footer('\n})();'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});
gulp.task('productionize-styles', function() {
  return gulp.src('public/styles.css')
    .pipe(cssnano())
    .pipe(gulp.dest('public'));
});
gulp.task('production', gulp.parallel('productionize-js', 'productionize-styles'));

// WATCH
gulp.task('watch', function() {
  gulp.watch('dev/dependencies/!(dependencies.min)*.js', gulp.series('dependencies', 'scripts'));
  gulp.watch('dev/templates/**/*.hbs', gulp.series('handlebars'));
  gulp.watch('dev/js/**/*.js', gulp.series('scripts', 'lint'));
  gulp.watch('dev/less/**/*.less', gulp.series('less'));
});

// DEFAULT
gulp.task('default', gulp.series('handlebars', 'scripts', 'lint', 'less', 'watch'));

// http://goo.gl/SboRZI
// Prevents gulp from crashing on errors.
function onError(err) {
  console.log(err);
  this.emit('end');
}