import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from '../adminSlice';
import cartReducer from '../cartSlice';

const rootReducer = combineReducers({
  admin: adminReducer,
  cart: cartReducer,
});

export default rootReducer;
