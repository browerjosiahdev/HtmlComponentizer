/* eslint-disable no-var, strict */
process.env.NODE_ENV = 'production';

var buildDir = './build/package/';
var debugDir = 'Q:/josiah/allencomm_htmlcomponentizer/';
var fs = require('fs');
var exec = require('child-process-promise').exec;

exec('node ./tools/build.js')
  .then(function() {
    fs.createReadStream(buildDir + 'html-componentizer.js')
      .pipe(fs.createWriteStream(debugDir + 'html-componentizer.js'));

    fs.createReadStream(buildDir + 'html-componentizer.js.map')
      .pipe(fs.createWriteStream(debugDir + 'html-componentizer.js.map'));

    console.log('copy to debug: ' + debugDir);
  });
