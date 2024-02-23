import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
        const { id, quantity } = action.payload;
        const existingIndex = state.items.findIndex(item => item.id === id);

        if (existingIndex >= 0) {
            state.items[existingIndex].quantity += quantity;
        } else {
            state.items.push(action.payload);
        }
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
            existingItem.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        resetCart: (state) => {
        state.items = [];
        },
    },
});

export const { addToCart, updateItemQuantity, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
