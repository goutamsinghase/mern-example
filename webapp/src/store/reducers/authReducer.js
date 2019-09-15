import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS, 
  SESSION_LOGOUT
} from "../constants/action-types";

import { AUTH_DATA } from "../../config/local-storage-keys";

const initialState = {
  userData: {},
  forgotPasswordData: {
    resetPasswordSuccess: false
  },
  isAuthenticated: true
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem(
          AUTH_DATA,
          JSON.stringify(action.payload.data)
        );
      return {
        ...state,
        userData: action.payload.data,
        isAuthenticated: true
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {...state, 
        forgotPasswordData: action.payload.data
      };
      
    case RESET_PASSWORD_SUCCESS:
      return {...state, 
        forgotPasswordData: {
          resetPasswordSuccess: true
        }
    };
    case SESSION_LOGOUT: 
      localStorage.removeItem(AUTH_DATA);
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;