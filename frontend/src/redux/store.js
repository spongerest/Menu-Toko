import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Impor reducer utama Anda

export const store = configureStore({
    reducer: rootReducer,
});
