'use strict';

module.exports = {

  'role': {
    'user': 1
  },

  'deviceType': {
    'browser': 3
  },

  'accountStatus': {
    'user': {
      'pending': 1,
      'active': 2,
      'blocked': 3,
      'deleted': 4,
      'temporary': 5
   }
  },
  'defaultUser':{
    'firstName': 'Goutam', 
    'lastName': 'Singha', 
    'email': 'goutam.singha.cse@gmail.com', 
    'password': '123456'
  }, 
  'sessionExpiredTime': 30 * 24 * 60 * 60 * 1000, // 1 month (in milliseconds)

  'otpExpiredTime': 24 * 60 * 60 * 1000, // 10 minutes (in milliseconds)

  'defaultCurrency': 'USD'
};