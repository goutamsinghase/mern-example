'use strict';

module.exports = function(app) {

  /**
   * Stores the lang files
   * @type {Object}
   */
  const lang = {
    'en-us': require(`${process.cwd()}/langFiles/en-us`)
  };

  return {

    /**
     * Returns the complete language data for a particular language type
     * @param  {String} langType The language type
     * @return {Object}          The language data
     */
    'getLang': function(langType) {
      if (lang.hasOwnProperty(langType)) {
        return lang[langType];
      } else if (lang.hasOwnProperty(app.config.lang.defaultLanguage)) {
        return lang[app.config.lang.defaultLanguage];
      } else {
        return 'LANG_NOT_FOUND';
      }
    },

    /**
     * Returns the message for a particular language type and language key
     * @param  {String} langType The language type
     * @param  {String} langKey  The language key
     * @return {String}          The message
     */
    'getMessage': function(langType, langKey) {
      if (lang.hasOwnProperty(langType) && lang[langType].hasOwnProperty(langKey)) {
        return lang[langType][langKey];
      } else if (lang[app.config.lang.defaultLanguage].hasOwnProperty(langKey)) {
        return lang[app.config.lang.defaultLanguage][langKey];
      } else {
        return 'MESSAGE_NOT_FOUND';
      }
    },

    /**
     * Attach the user's preferred language or default language to req.query
     * @param  {Object}   req  The request object
     * @param  {Object}   res  The response object
     * @param  {Function} next Next middleware
     */
    'addDefaultLanguage': function(req, res, next) {
      if (!req.query.lang) {
        if (req.user && req.user.defaultLanguage) {
          req.query.lang = req.user.defaultLanguage;
        } else {
          req.query.lang = req.app.config.lang.defaultLanguage;
        }
      }
      next();
    }
  };

};
