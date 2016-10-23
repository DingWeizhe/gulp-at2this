var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-at2this', 'Streaming not supported'));
      return;
    }

    try {
      var content = file.contents.toString();
      content = content.replace(/([\-\s\(\)\!\{])\@/ig, "$1this.");
      file.contents = new Buffer(content);
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-at2this', err, {
        fileName: file.path,
        showProperties: false
      }));
    }

    cb();
    return;
  });
};
