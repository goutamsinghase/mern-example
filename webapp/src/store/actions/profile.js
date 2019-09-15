// API Config
import {apiURLs} from '../api-config/api.urls';
// Action Types Constant
import {LOGOUT, LOGOUT_CLIENT_SUCCESS} from "../constants/action-types";



///////////////////////////////// Logout // ///////////////////////////////
export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            request: {
                url: apiURLs.logout,
                method: "PUT"
            }
        }
    };
};

///////////////////////////////// Logout // ///////////////////////////////
export const logoutSuccess = () => {
    return {type: LOGOUT_CLIENT_SUCCESS};
};
