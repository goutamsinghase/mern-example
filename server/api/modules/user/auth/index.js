'use strict';
/**
 * This module handles all functionality of auth portion in user
 * @module Modules/User/Auth
 */
module.exports = function(app) {

  /**
   * User model
   * @type {Mongoose.Model}
   */
  const User = app.models.User;

  /**
   * Login function for user
   * @param  {Object}   headerData             The header data
   * @param  {Number}   headerData.deviceType  The device type
   * @param  {String}   headerData.deviceId    The device id
   * @param  {Object}   loginData              The login data
   * @param  {String}   loginData.email        The email address
   * @param  {String}   loginData.password     The password
   * @return {Promise}                         The promise
   */
  function login(headerData, loginData) {
    /**
     * Custom login details validation
     * @param  {String} email    The email address
     * @param  {String} password The password
     * @return {Promise}         The promise
     */
    function loginValidate(email, password) {
      return User.findOne({
          'personalInfo.email': email
        })
        .exec()
        .then(userDoc => userDoc ? Promise.resolve(userDoc) : Promise.reject({ 'errCode': 'USER_NOT_FOUND' }))
        .then(userDoc => app.utility.validatePassword(password, userDoc.authenticationInfo.password).then(result => result ? Promise.resolve(userDoc) : Promise.reject({ 'errCode': 'PASSWORD_MISMATCH' })))
        .then(userDoc => Promise.resolve({
          'userDoc': userDoc,
          'userType': app.config.user.role.user
        }));
    }

    return loginValidate(loginData.email, loginData.password)
      .then(output => app.module.session.set(output.userType, output.userDoc, headerData.deviceType, headerData.deviceId));
  }

 

  return {
    'login': login
  };
};