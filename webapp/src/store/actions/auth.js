// API Config
import { apiURLs } from '../api-config/api.urls';

// Action Types Constant 
import {
  LOGIN,
  SESSION_LOGOUT
} from "../constants/action-types";


///////////
// Login //
///////////
export const login = (data) => {
  return {
    type: LOGIN,
    payload: {
      request: {
        url: apiURLs.login,
        method: "POST",
        data: data
      }
    },
    hideToast: true
  };
};

////////////////////
// Session Logout //
////////////////////
export const session_logout = ()=>{
  return {
    type: SESSION_LOGOUT
  }
};
