'use strict';

///////////////////////////////////////////////////
// THIS IS THE ROUTE FILE FOR ADMIN USER MODULE //
///////////////////////////////////////////////////

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
     * The Controllers for these APIs
     * @type {Object}
     */
    const controllers = require('./controller')(app);

    /**
     * Custom Login
     */
    router.post('/login', [
        options.validateBody(schemaValidator.login),
        controllers.login
    ]);

    return router;
};