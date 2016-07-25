'use strict';

var axon        = require('axon');
var utils       = require('yocto-utils');

// create dispatch socket to interract with monitoring tools if needed
var pushSocket  = axon.socket('push');
// create a lister to interract with remote server
var pullSocket  = axon.socket('pull');
// define local port
var LOCAL_PORT  = 4242;

/**
 * Start and bind socket push for remote interraction
 */
var start = function () {
  // listen on
  pushSocket.bind(LOCAL_PORT);
};

/**
 * Listen local port and interract with remote server
 */
var listen = function () {
  // connect on defined port
  pullSocket.connect(LOCAL_PORT);

  // on message ? what we do ?
  pullSocket.on('message', function(message) {
    //console.log(utils.obj.inspect(message));
    // need to implement request on our server
  });
};

/**
 * Send request on local port to interract with remote service
 *
 * @param {Object} data content to send on socket
 */
var send = function (data) {
  // default loggind process
  console.log(data);
  // send data on push
  pushSocket.send(data);
};

/**
 * Default export
 */
module.exports = {
  start  : start,
  listen : listen,
  send   : send
};