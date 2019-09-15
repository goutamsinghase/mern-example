'use strict';

/**
 * The express router (factory function)
 * @type {Function}
 */
const expressRouter = require('express').Router;

/**
 * Route Components
 * @type {Object}
 */
const routes = {
  /**
   * Auth Route
   */
  'auth': require('./auth/route'),
   /**
   * Profile Route
   */
  'profile': require('./profile/route'),
  /**
   * Item Route
   */
  'item': require('./item/route')
};

module.exports = function(app) {

  const options = {

    /**
     * Validates the request body
     * @type {Function}
     */
    'validateBody': app.utility.apiValidate.body,
    /**
     * Validates the request query
     * @type {Function}
     */
    'validateQuery': app.utility.apiValidate.query,

    /**
     * Validates the request param
     * @type {Function}
     */
    'validateParams': app.utility.apiValidate.params
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                                               //
  // PUBLIC ROUTES                                                                                                                 //
  //                                                                                                                               //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const publicRouter = expressRouter();

  /**
   * Custom Login Module
   */
  publicRouter.use('/auth', routes.auth(app, options));

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                                               //
  // PRIVATE ROUTES                                                                                                                //
  //                                                                                                                               //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const privateRouter = expressRouter();

   /**
   * Profile Route
   */
  privateRouter.use('/profile', routes.profile(app, options));

  /**
   * Item Route
   */
  privateRouter.use('/item', routes.item(app, options));

  return {
    'public': publicRouter,
    'private': privateRouter
  };
};