'use strict';
/*jshint node:true */
var fs = require('fs');

function mergeObject(obj1, obj2) {
  for (var p in obj2) {
    if (obj2.hasOwnProperty(p)) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor === Object ) {
          obj1[p] = mergeObject(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
  }
  return obj1;
}

function init(defaults, configFileName, verbose) {
  try {
    var config = mergeObject({}, defaults || {}); // just to make a copy
    mergeObject(config, JSON.parse(fs.readFileSync(configFileName)));
    if (verbose) {
      console.log('[PackageSettings] - using file ' + configFileName);
      console.log('[PackageSettings] ----------');
      console.log(JSON.stringify(config, null, 2));
      console.log('[PackageSettings] ----------');
    }
    return config;
  }
  catch (e) {
    if (verbose) {
      console.log('[PackageSettings] - not using file');
      console.log('[PackageSettings] ----------');
      console.log(JSON.stringify(config, null, 2));
      console.log('[PackageSettings] ----------');
    }
    return defaults;
  }
}

exports.init = init;
