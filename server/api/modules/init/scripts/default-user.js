'use strict';
/**
 * This module handles all functionality of Default User
 * @module Modules/Init/DefaultUser
 */
module.exports = function(app) {
    return Promise.all([
            app.models.User.count().exec(),
            app.utility.encryptPassword(app.config.user.defaultUser.password)
        ])
        .spread((count, password) => {
            if (count === 0) {
                return (new app.models.User({
                    'personalInfo': {
                        'firstName': app.config.user.defaultUser.firstName,
                        'lastName': app.config.user.defaultUser.lastName,
                        'email': app.config.user.defaultUser.email
                    }, 
                    'authenticationInfo': {
                        'password': password
                    }
                })).save();

            } else {
                return Promise.resolve(null);
            }
        });
};