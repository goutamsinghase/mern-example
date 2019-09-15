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
module.exports = function (app, options) {
    'use strict';
  

   

    /**
   * The Controllers for these APIs
   * @type {Object}
   */
    const controllers = require('./controller')(app);

    

    /**
   * Logout
   */
    router.put('/logout', controllers.logout);

    return router;
};