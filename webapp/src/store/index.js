import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from './axios-middleware';
import rootReducer from './reducers';
const store = createStore(rootReducer, applyMiddleware(axiosMiddleware));
export default store;