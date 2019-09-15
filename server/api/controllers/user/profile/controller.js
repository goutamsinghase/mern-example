/**
 * This Controller handles all functionality of User Profile
 * @module Controllers/User/Profile
 */
module.exports = function (app) {
    'use strict';

    /**
   * user module
   * @type {Object }
   */
    const user = app.module.user;

   
    /**
   * Logout
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
    const logout = (req, res, next) => {
        user.logout({'token': req.headers['x-auth-token'], 'deviceType': req.headers['x-auth-devicetype'], 'deviceId': req.headers['x-auth-deviceid']}).then(() => req.workflow.emit('response')).catch(next);
    };

 

    return {logout};
};