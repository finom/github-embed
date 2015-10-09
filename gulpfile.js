var gulp = require('gulp');

gulp.task('deploy', () => {
	var sftp = require('gulp-sftp');
	gulp.src(['./**/*', '!node_modules/**/*'])
        .pipe(sftp({
            host: 'matreshka.io',
            auth: 'keyMain',
			remotePath: '/home/finom/web/gh-embed/'
        }));
});