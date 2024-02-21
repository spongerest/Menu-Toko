// src/redux/reducers/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
// Impor reducer lainnya
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // Definisikan reducer Anda di sini
    user: userReducer,
  // reducer lainnya...
});

export default rootReducer;
