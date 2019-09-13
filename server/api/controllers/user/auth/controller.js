'use strict';

/**
 * This Controller handles all functionality of User Auth
 * @module Controllers/User/Auth
 */
module.exports = function(app) {

  /**
   * User module
   * @type {Object}
   */
  const user = app.module.user;

  /**
   * login 
   * @param  {Object}   req  Request 
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const login = (req, res, next) => { // jshint ignore:line
    user.auth.login({
        'deviceType': req.headers['x-auth-devicetype'],
        'deviceId': req.headers['x-auth-deviceid']
      }, {
        'email': req.body.email,
        'password': req.body.password
      })
      .then((output) => {
        req.workflow.outcome.data = {
          'token': output.token,
          'user': app.utility.format.user(output.userId),
          'userType': output.userType
        };
        req.workflow.emit('response');
      })
      .catch(next);
  };


  return {
    'login': login
  };
};