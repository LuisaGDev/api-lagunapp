var gulp    = require('gulp');
var apidoc  = require('gulp-apidoc');

gulp.task('apidoc', function(){
  apidoc.exec({
    src: "app/",
    dest: "public/apidoc",
    includeFilters: [ "^((?!node_modules).)*$" ]
  });
});
