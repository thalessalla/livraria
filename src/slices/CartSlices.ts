import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;




