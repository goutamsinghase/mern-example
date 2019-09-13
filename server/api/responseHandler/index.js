'use strict';

module.exports = function(app) {

  /**
   * The list of error codes
   * @type {Array}
   */
  const errorCodes = require('./scripts/errorCodes')(app);

  /**
   * Retrieves the numerical error code from the textual error code
   * @param  {String} code The textual error code
   * @return {Number}      The numerical error code
   */
  const getErrorCode = function(errCode) {
    let errorCode = errorCodes[errCode];
    if (!errorCode) {
      console.log(`${errCode} -> doesn't have error code`);
      if (app.get('env') !== 'production') {
        return errCode;
      }
    }
    return errorCode || 403;
  };

  /**
   * Handles success responses to the client
   * @param  {Object}   req  The request object
   * @param  {Object}   res  The response object
   * @param  {Function} next The next middleware
   */
  const successHandler = function(req, res /*, next*/ ) {
    if (req.workflow.outcome.data) {
      res.status(200).json({
        'success': true,
        'data': req.workflow.outcome.data
      });
    } else {
      res.status(400).end();
    }
  };

  /**
   * Handles error responses to the client
   * @param  {Object}   err  The error object
   * @param  {Object}   req  The request object
   * @param  {Object}   res  The response object
   * @param  {Function} next The next middleware
   */
  const errorHandler = function(err, req, res, next) {

    /**
     * Types of errors
     *
     * 1. API & DB validation errors (400)
     * 2. Business logic errors, DB errors (including, duplicate) (500) 
     * 3. 3rd party API errors (424)
     * 4. Unhandled/other errors (500)
     */


    if (typeof err === 'object' && err.hasOwnProperty('errCode') && typeof err.errCode === 'string') {

      let response = {
        'success': false,
        'errorCode': getErrorCode(err.errCode)
      };
      if (err.hasOwnProperty('errorDetails')) {
        response.errorDetails = err.errorDetails;
      }

      if (app.get('env') !== 'production') {

        console.log(err);

        if (!req.workflow) {
          return next(err);
        }

        if (req.workflow.outcome.errors.length) {
          response.errors = req.workflow.outcome.errors;
        }
        if ((Object.keys(req.workflow.outcome.errfor).length)) {
          response.errfor = req.workflow.outcome.errfor;
        }
        if (typeof response.errorCode === 'string') {
          response.error_code = [response.errorCode]; // jshint ignore:line
          response.errorCode = 403;
        }
      }

      return res.status((response.errorCode) ? 200 : 500).json(response);
    } else {
      return next(err);
    }
  };

  return [successHandler, errorHandler];
};