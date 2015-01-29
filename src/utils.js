'use strict';

var gutil        = require('gulp-util'),
    logSymbols   = require('log-symbols'),
    indentString = require('indent-string');

var Utils = {

  /**
   * Resolve writable.
   */
  resolveWritable: function (writable) {

    if (!writable) {
      writable = gutil.log;
    }
    else if (typeof writable === 'function') {
      writable = writable.bind(writable);
    }

    return writable;

  },

  /**
   * Format report.
   */
  formatReport: function (file, report, onlyFailures) {

    var audits   = report.audit || [],
        output   = '',
        passes   = '',
        failures = '';

    onlyFailures = onlyFailures || false;

    audits.forEach(function (audit) {
      if (audit.result === 'PASS' && !onlyFailures) {
        passes += logSymbols.success + ' ' + audit.heading + '\n';
      }
      if (audit.result === 'FAIL') {
        failures += logSymbols.error + ' ' + audit.heading + '\n';
        failures += audit.elements + '\n\n';
      }
    });

    if (passes || failures) {
      output += '\n\n';
      output += indentString(gutil.colors.yellow(file.path), ' ', 2);
      output += '\n\n';
      output += indentString(failures + passes, ' ', 2);
    }

    return output;

  },

  /**
   * Write results to writable / output.
   */
  writeReport: function (report, writable) {

    if (writable && report) {
      writable(report);
    }

  }

};

module.exports = Utils;
