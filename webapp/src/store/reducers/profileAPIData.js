import {GET_PROFILE_SUCCESS, SET_PROFILE_SUCCESS, SET_RESTAURANT_PROFILE_SUCCESS, LOGOUT_SUCCESS, LOGOUT_CLIENT_SUCCESS} from "../constants/action-types";

import {AUTH_DATA} from "../../config/local-storage-keys";

const initialState = {
    profile: {},
    logout: false
};

const profileAPIData = (state = initialState, action) => {

    switch (action.type) {

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload.data
            };

        case SET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload.data
            };

        case SET_RESTAURANT_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload.data
            };

        case LOGOUT_SUCCESS:
            localStorage.removeItem(AUTH_DATA);
            return {
                ...state,
                logout: true
            };

        case LOGOUT_CLIENT_SUCCESS:
            return {
                ...state,
                logout: false
            };

        default:
            return state;
    }
};

export default profileAPIData;