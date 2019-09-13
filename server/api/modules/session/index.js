'use strict';

/**
 * This module handles all functionality of Session Management
 * @module Modules/Session
 */
module.exports = function(app) {

  /**
   * Returns the model name for the given user type
   * @param  {Number} userType The user type
   * @return {String}          The model name
   */
  const getUserModelName = function(userType) {

    let userRole = Object.keys(app.config.user.role).filter((each) => (app.config.user.role[each] === userType))[0];

    switch (userRole) {
      case 'admin':
        return 'Admin';
      case 'user':
        return 'User';
    }
  };

   /**
   * Sets the session
   * @param  {Number}   userType              The user type
   * @param  {String}   userDoc               The user document
   * @param  {Number}   deviceType            The device type
   * @param  {String}   deviceId              The device id
   * @return {Promise}                        The Promise
   */
  function setSession(userType, userDoc, deviceType, deviceId, notificationKey) {
    return app.models[getUserModelName(userType)].createSession(deviceType, deviceId, userDoc, notificationKey);
  }

  /**
   * Gets the session
   * @param  {String}  token       The unique token
   * @param  {Number}  deviceType  The device type
   * @param  {String}  deviceId    The device id
   * @param  {Number}   userType   The user type
   * @return {Promise}             The Promise
   */
  function getSession(token, deviceType, deviceId, userType, notificationKey) {
    console.log('notificationKey', notificationKey);
    return app.models[getUserModelName(userType)].validateSession(token, deviceType, deviceId, true, notificationKey);
  }

  /**
   * Kills the session
   * @param  {String}  token      The unique token
   * @param  {Number}  deviceType The device type
   * @param  {String}  deviceId   The device id
   * @param  {Number}  userType  The user type
   * @return {Promise}            The Promise
   */
  function killSession(token, deviceType, deviceId, userType) {
    return app.models[getUserModelName(userType)].removeSession(token, deviceType, deviceId);
  }

  /**
   * Removes session by user id
   * @param  {String} userId      The id of the user
   * @param  {Number} userType    The user type
   * @return {Promise}            The Promise
   */
  function removeSessionByUserId(userId, userType) {
    return app.models[getUserModelName(userType)].removeSessionByUserId(userId);
  }


  return {
    'set': setSession,
    'get': getSession,
    'kill': killSession,
    'remove': removeSessionByUserId
  };
};