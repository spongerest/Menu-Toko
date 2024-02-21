import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminData: null,
    },
    reducers: {
        adminLogin: (state, action) => {
            state.adminData = action.payload;
        },
    },
});

export const { adminLogin } = adminSlice.actions;
export default adminSlice.reducer;
