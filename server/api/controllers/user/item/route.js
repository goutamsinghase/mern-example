'use strict';

/**
 * The express router
 * @type {Express.Router}
 */
const router = require('express').Router();

/**
 * @param  {Express} app     The express app reference
 * @param  {Object}  options The options for this module
 * @return {Object}          The revealed module
 */
module.exports = function(app, options) {

  /**
   * The JSON-Schema for these APIs
   * @type {Object}
   */
  const schemaValidator = require('./schema-validator')(app);

  /**
   * The Common Middlewares for these APIs
   * @type {Object}
   */
  const commonMiddlewares = require('../../common/middleware')(app);

  /**
   * The Controllers for these APIs
   * @type {Object}
   */
  const controllers = require('./controller')(app);


   /**
   * Item Routes (list/add)
   */
  router.route('/')
    .get([
      controllers.list
    ])
    .post([
      options.validateBody(schemaValidator.addItem),
      controllers.add
    ]);

  /**
   * Item Routes (get/delete)
   */
  router.route('/:itemId')
    .all([
      options.validateParams(schemaValidator.itemId),
      commonMiddlewares.validateId('Item', 'itemId')
    ])
    .get([
      controllers.get
    ])
    .delete([
      controllers.delete
    ]);

  

  return router;
};