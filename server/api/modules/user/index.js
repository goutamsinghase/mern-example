'use strict';

module.exports = function(app) {

  const auth = require('./auth')(app);
   /**
   * Logout function for admin
   * @param  {Object}  headerData            The header data
   * @param  {String}  headerData.token      The auth token
   * @param  {Number}  headerData.deviceType The device type
   * @param  {String}  headerData.deviceId   The device id
   * @return {Promise}                       The promise
   */
  const logout = function (headerData) {
    return app.module.session.kill(headerData.token, headerData.deviceType, headerData.deviceId, app.config.user.role.user);
  };

  return {
    auth, 
    logout
  };
};