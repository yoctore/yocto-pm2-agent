'use strict';

var pmx         = require('pmx');
var pm2         = require('pm2');
var _           = require('lodash');
var utils       = require('yocto-utils');
var os          = require('os');
var fs          = require('fs');
var async       = require('async');
var logger      = require('yocto-logger');
var interact    = require('./lib/interact');

// Init pmx module
pmx.initModule({
  // Options related to the display style on Keymetrics
  widget : {
    // Logo displayed
    logo : [ 'http://ddf912383141a8d7bbe4-e053e711fc85de3290f121ef0f0e3a1f.',
              'r87.cf1.rackcdn.com/cloud-monitoring-icon.png' ].join('')
    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    // Maybe need to custom this ?
    theme            : [ '#141A1F', '#222222', '#3ff', '#3ff' ],
    // Section to show / hide
    el : {
      probes  : true,
      actions : true
    },
    // Main block to show / hide
    block : {
      actions : false,
      issues  : true,
      meta    : true,
      // Custom metrics to put in BIG
      // no process
      main_probes : [ ]
    }
  }
}, function(err, conf) {
  // start interact
  interact.start();
  // has a public for for interract
  if (!_.isEmpty(conf.publicKey)) {
    // send request
    interact.listen();
  }

  // default interval for cleaning
  var interval;

  /**
   * Default notify error function. Provide general process in case of error
   *
   * @param {String} message default message to display
   * @param {Boolean} exit if true exit process
   */
  function notifyError (message, exit) {
    // clear interval
    logger.error(message);
    // socket emit here if interract is available
    // normal exit
    if (exit) {
      process.exit(2);
    }
  }

  /**
   * Main function to 
   */
  function doJob () {
    // connect to daemon ?
    pm2.connect(function (error) {
      // has error ?
      if (error) {
        // process notify error
        notifyError([ '[ Yocto pm2 agent ] - an error occured durring connect :' ,
          err ].join(' '), true);
      } else {
        // send a request here to alert web remote interface that the current daemon is available

        // complete data
        var complete = {
          system  : {
            hostname  : os.hostname(),
            uptime    : os.uptime()
          },
          monit   : {
            loadavg     : os.loadavg(),
            total_mem   : os.totalmem(),
            free_mem    : os.freemem(),
            cpu         : os.cpus(),
            interfaces  : os.networkInterfaces()
          },
          process     : []
        };

        // list all available process
        pm2.list(function (error, lists) {
          // has error ?
          if (error) {
            // process notify error
            notifyError([ '[ Yocto pm2 agent ] - an error occured durring process listing :' ,
              error ].join(' '), false);
          }
          // parse all processes
          async.eachSeries(lists, function (list, next) {
            // describe process
            pm2.describe(list.name, function (error, result) {
              // has error ?
              if (error) {
                // process notify error
                notifyError([ '[ Yocto pm2 agent ] - an error occured durring process describe :' ,
                  error ].join(' '), false);
              }
              // normalize result
              result = _.first(result);
              // get some data
              var agent   = _.result(result, 'monit');
              var monitor = _.result(result, 'pm2_env.axm_monitor');

              // build data
              var process = {
                name    : result.name,
                monit   : agent,
                probes  : monitor,
                error   : false
              };

              // retreive error
              process.error = _.result(result, 'pm2_env.status') !== 'online' ?
                fs.readFileSync(_.result(result, 'pm2_env.pm_err_log_path'),
                  'utf-8').toString().split('\n') : false;

              // normalize error to get lust the last item
              process.error = _.isArray(process.error) ? _.nth(process.error) : false;

              // push item on list
              complete.process.push(process);
              // go to the next item
              next();
            });
          }, function () {
            // send data on local and to remote server
            interact.send(complete);
            // disconnect to God
            pm2.disconnect();
            // clear previous interval
            clearInterval(interval);
            // process next interval
            interval = setInterval(doJob, conf.refresh || 10000);
          });
        });
      };
    });
  };
  // start all process
  doJob();
});
