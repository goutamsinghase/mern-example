import { combineReducers } from "redux";
import authReducer from "./authReducer";
import literalsReducer from "./literalsReducer";
import profileAPIData from './profileAPIData';
import itemAPIData from './itemAPIdata';

import {
    LOGOUT_SUCCESS
} from "../constants/action-types";


const combinedReducer = combineReducers({
  authReducer,
  literalsReducer,
  profileAPIData,
  itemAPIData
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
    	let literalsReducer = state.literalsReducer;
    	state = {
    		literalsReducer
    	};
    }
    return combinedReducer(state, action);
}

export default rootReducer;
