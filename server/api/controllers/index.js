'use strict';

const router = require('express').Router();

module.exports = function(app) {
  const schemaValidators = {
    'common': require('./common/schema-validator')(app)
  };


  /**
   * Attaching to app for ease
   * @type {Object}
   */
  app.apiSchema = schemaValidators;


  /**
   * All the middlewares in this project
   * @type {Object}
   */
  const middlewares = {
    'common': require('./common/middleware')(app)
  };

  /**
   * Attaching to app for ease
   * @type {Object}
   */
  app.middlewares = middlewares;

  /**
   * All the API routes in this project
   * @type {Object}
   */
  const routes = {

    'user': require('./user')(app),

    'common': require('./common/route.js')(app),

  };

  //////////////////////////////////////////////
  // Attaching the body-parser module for raw //
  //////////////////////////////////////////////
  // router.use('/webhook', require('body-parser').raw({ type: '*/*' }), routes.webhook.public);

  ///////////////////////////////////////////////
  // Attaching the body-parser module for json //
  ///////////////////////////////////////////////
  router.all('*', require('body-parser').json());


  // router.all('*', app.middlewares.common.headerValidator());

  router.use('/account*', app.middlewares.common.headerValidator(), app.middlewares.common.tokenValidator());

  /**
   * Public routes
   */
  router.use('/common', routes.common.public);

  /**
   * User Routes
   */
  router.use('/user', app.middlewares.common.headerValidator(), routes.user.public);

  router.use('/account/user', app.middlewares.common.checkSession(app.config.user.role.user), app.middlewares.common.checkUserAccess(app.config.user.role.user), routes.user.private);


  return router;
};