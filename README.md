
# PackageSettings

**A package to manage the runtime settings of your project.**

Let's say you have two servers that need the same project to be run on each but they need to be run on different ports. This package makes it easy to have the same code on each but the programs run with different settings.


```
var packageSettings = require('packagesettings');

// If no file is specified or the file doesn't contain a value for `port` then
// the value here will be used.
var defaults = {
  port: 8000
};

// If you have been given an argument when starting up treat it as the name
// of the settings file (in JSON format). If not then use `config.json` in
// the current directory.

if (process.argv.length === 3) {
  var config = packageSettings.init(defaults, process.argv[2], true);
} else {
  var config = packageSettings.init(defaults, __dirname + '/config.json', true);
}
```

