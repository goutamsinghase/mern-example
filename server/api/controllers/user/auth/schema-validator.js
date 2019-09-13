'use strict';

module.exports = function(app) {

    /////////////////
    //  Auth  //
    /////////////////

    const login = {
        'email': {
            type: 'string',
            required: true,
            format: 'email',
            allowEmpty: false
        },
        'password': {
            type: 'string',
            required: true,
            allowEmpty: false
        }
    };
    
    
    return {
        'login': login
    };
};