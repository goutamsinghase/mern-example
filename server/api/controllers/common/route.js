'use strict';

/**
 * The router for public routes
 * @type {Express.Router}
 */
const router = require('express').Router();


module.exports = function(app) {
  /**
   * The JSON-Schema for these APIs
   * @type {Object}
   */
  const schemaValidator = require('./schema-validator')(app);
  /**
   * The Controllers for these APIs
   * @type {Object}
   */
  const controllers = require('./controller')(app);

  /**
   * Get Global Config
   */
  router.get('/global-config', controllers.getGlobalConfig);

  return {
    'public': router
  };
};