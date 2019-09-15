import {
  LOAD_LITERALS
} from "../constants/action-types";


/////////////////////
// Action Creators //
/////////////////////

export const loadLiterals = literals => ({
  type: LOAD_LITERALS,
  payload: literals,
});