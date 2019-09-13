'use strict';

module.exports = function(app) {

  const auth = require('./auth')(app);

  return {
    auth
  };
};