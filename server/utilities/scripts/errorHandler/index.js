'use strict';

module.exports = function(app) { // jshint ignore:line

  process.on('uncaughtException', function(error) {
    console.log('>>> Uncaught Exception');
    console.log(error);
    if (typeof error === 'object' && error.hasOwnProperty('stack')) {
      console.log(error.stack);
    }
    process.exit();
  });

  return function(error, request, response, next) { // jshint ignore:line
    console.log('>>> Unhandled Error');
    console.log(error);
    if (typeof error === 'object') {
      if (error.hasOwnProperty('message')) {
        console.log(error.message);
      }
      if (error.hasOwnProperty('stack')) {
        console.log(error.stack);
      }
    }
    return response.status(500).end();
  };
};
