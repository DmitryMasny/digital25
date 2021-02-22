import { combineReducers } from 'redux';

import authReducer from './authReducer';
// import { test2 } from './reducers/test2';


export const rootReducer = combineReducers({
  auth: authReducer,
  // test2
})
