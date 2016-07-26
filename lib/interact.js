'use strict';

var utils       = require('yocto-utils');
var io          = require('socket.io-client');
var _           = require('lodash');

/**
 * Listen local port and interract with remote server
 *
 * @param {Object} config
 */
function Interact(config) {
  // default status
  this.isReady = false;

 // has a public for for interract
  if (!_.isEmpty(config.publicKey) && !_.isEmpty(config.bucketKey) && !_.isEmpty(config.host)) {
    // normalize value
    config.host  = [ config.host || '127.0.0.1:4242', 'monitoring' ].join('/');

    // connect on server
    this.socket = io.connect(config.host, { reconnect : true });

    // catch connect event
    this.socket.on('connect', function () {
      // change ready state
      this.isReady = true;
      // log connected
      console.log([ 'Connected on remote monitoring server [', config.host, ']' ].join(' '));
    }.bind(this));

    // catch connection error
    this.socket.on('connect_error', function (error) {
      // change ready state
      this.isReady = false;
      // log error
      console.log([ 'Connection error on remote monitoring server [',
        config.host, '] :', error ].join(' '));
    }.bind(this));

    // catch connection timeout
    this.socket.on('connect_timeout', function (error) {
      // change ready state
      this.isReady = false;
      // log timeout
      console.log([ 'Connection timeout on [', config.host, ']' ].join(' '));
    }.bind(this));

    // catch reconnect event
    this.socket.on('reconnect', function (attemps) {
      // change ready state
      this.isReady = true;
      // log messsage
      console.log([ 'Reconnecting on [', config.host, '] succed. Attemps : [', attemps,
        ']' ].join(' '));
    }.bind(this));

    // catch reconnect attemp value
    this.socket.on('reconnect_attempt', function (attemps) {
      // change ready state
      this.isReady = false;
      // log message
      console.log([ 'Trying to reconnect on [', config.host, ']. Attemps : [',
        attemps, ']' ].join(' '));
    }.bind(this));

    // catch reconnecting attemps value
    this.socket.on('reconnecting', function (attemps) {
      // log message
      console.log([ 'Reconnecting on [', config.host, ']. Attemps : [', attemps,
        ']' ].join(' '));
    }.bind(this));

    // catch reconnection error
    this.socket.on('reconnect_error', function (error) {
      // change ready state
      this.isReady = false;
      // log error
      console.log([ 'Reconnection error on remote monitoring server [',
        config.host, '] :', error ].join(' '));
    }.bind(this));
  }
};

/**
 * Send request on local port to interract with remote service
 *
 * @param {Object} data content to send on socket
 */
Interact.prototype.send = function (data) {
  // is Ready ?
  if (this.isReady) {
    // emit to remote server
    this.socket.emit('new', data);
  } else {
    // default log stats
    console.log(data);
  }
};

/**
 * Default export
 *
 * @param {Object} config to use
 */
module.exports = function (config) {
  // default statement
  return new Interact(config);
};
