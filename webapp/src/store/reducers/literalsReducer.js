import {
  LOAD_LITERALS
} from "../constants/action-types";

// Default State
const defaultState = {};

/////////////
// Reducer //
/////////////
export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOAD_LITERALS:
      return payload;
    default:
      return state;
  }
};
