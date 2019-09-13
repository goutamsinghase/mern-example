'use strict';

module.exports = function(app, mongoose /*, plugins*/ ) {

  const userSchema = new mongoose.Schema({
    "name" : String, 
    "__v" : Number, 
    "composer" : {
        "picture" : String, 
        "gross" : Number, 
        "average" : Number, 
        "movies" : Number, 
        "total_gross" : Number, 
        "rank" : Number
    }, 
    'user': {
      'type': mongoose.Schema.Types.ObjectId,
      'ref': 'User'
    }
  }, {
    'versionKey': false,
    'timestamps': true
  });

  return userSchema;
};