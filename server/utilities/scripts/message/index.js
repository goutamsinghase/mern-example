'use strict';
/**
 * Messages Class
 * @class
 */

function Message() {}

/**
 * @this Message
 * genrate a required field error message for user
 * @param {String} item     name of the required field
 * @return {String}         generated string
 */
Message.prototype.REQUIRED = function(item) {
  return item + ' is required';
};

/**
 * @this Message
 * genrate a invalid field error message for user
 * @param {String} item     name of the invalid field
 * @return {String}         generated string
 */
Message.prototype.INVALID = function(item) {
  return item + ' is invalid';
};

/**
 * @this Message
 * genrate a not found error message for user
 * @param {String} item     name of the not found field
 * @return {String}         generated string
 */
Message.prototype.NOTFOUND = function(item) {
  return item + ' is not found';
};

/**
 * @this Message
 * genrate a write error message
 * @param {String} item     name of the readonly field
 * @return {String}         generated string
 */
Message.prototype.READONLY = function(item) {
  return item + ' is read-only';
};

/**
 * @this Message
 * genrate a overflow error message
 * @param {String} item     name of the overflow field
 * @return {String}         generated string
 */
Message.prototype.OVERFLOW = function(item) {
  return item + ' length exceeded';
};


/**
 * @this Message
 * genrate a minimum value error message
 * @param {String} item     name of the field
 * @return {String}         generated string
 */
Message.prototype.MIN = function(item, minValue) {
  return item + ' must have minimum value of ' + minValue;
};


/**
 * @this Message
 * genrate a maximum value error message
 * @param {String} item     name of the field
 * @return {String}         generated string
 */
Message.prototype.MAX = function(item, maxValue) {
  return item + ' must have maximum value of ' + maxValue;
};

/**
 * this function sets the development mesages field in the express app variable
 * @param  {express.app} app express server app
 */

module.exports = new Message();
