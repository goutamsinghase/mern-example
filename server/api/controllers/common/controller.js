'use strict';
/**
 * This Controller handles all functionality of Common
 * @module Controllers/Common/Controller
 */
module.exports = function(app) {

  const getGlobalConfig = function(req, res, next) { // jshint ignore:line

    app.module.globalConfig.get()
      .then(output => {
        req.workflow.outcome.data = output;
        req.workflow.emit('response');
      })
      .catch(next);
  };


  return {
    'getGlobalConfig': getGlobalConfig
  };
};