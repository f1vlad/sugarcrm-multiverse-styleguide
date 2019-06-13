// TODO https://nodejs.org/api/fs.html
// "If a file descriptor is specified as the path, it will not be closed automatically."

var collectLess = (lessRules, uniqueId) => {

  const fs = require('fs-extra');
  // `tmp_styleguide_ui_dir` directory is defined in build.sh
  const lessFile = `./tmp_styleguide_ui_dir/dump.less`;

  // create lessFile and its path if doesn't exist
  fs.ensureFileSync(lessFile)

  console.log(`Writing to ${lessFile} (${lessRules.trim().replace(/\s/g,'').substr(0,30)}...)`);

  // unique id to be placed next to each demo css block in dump.less, to check for duplicates
  // probably makes sense to make it into hash if this is the approach we take for production
  let identifier = lessRules.length + lessRules.trim().replace(/\s/g,'').replace(/[^\w\s]+/gi,'').substr(0,100);

  let lessContent = `\n/* ${identifier} */\n${lessRules}\n`;

  (async function () {
    // Read from lessFile so we can check for duplicate
    // Unfortunately handlebar helpers called twice, and
    // I couldn't figure out [yet] how to _not_ do that
    var data = fs.readFileSync(lessFile, 'utf-8');

    // If we don't have ID for less rules, write them to file
    data.indexOf(identifier) === -1 && write();
  })();

  function write() {
    // Write to lessFile
    fs.appendFileSync(lessFile, lessContent, (err) => {
      if(err) {
        return console.error(`Error: file append failure`);
      }
    });
  }
}

module.exports = (handlebars) => {
  handlebars.registerHelper('democssclasses', (css) => {
    return collectLess(css);
  });
}
