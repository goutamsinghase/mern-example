'use strict';

module.exports = function (app) {

    const itemId = {
        'itemId': {
            type: 'string',
            required: true,
            allowEmpty: false,
            conform: function (value) {
                return app
                    .utility
                    .checkMongooseObjectId(value);
            }
        }
    };

    const addItem = {
        "name": {
            type: 'string', 
            required: true
        },
        "__v": {
            type: 'number',
            required: true
        },
        "composer": {
            type: 'object',
            required: true,
            properties: {
                "picture": {
                    type: 'string',
                    required: true
                },
                "gross": {
                    type: 'number',
                    required: true
                },
                "average": {
                    type: 'number',
                    required: true
                },
                "movies": {
                    type: 'number',
                    required: true
                },
                "total_gross": {
                    type: 'number',
                    required: true
                },
                "rank": {
                    type: 'number',
                    required: true
                }
            }
        }
    };

    return {itemId, addItem};
};