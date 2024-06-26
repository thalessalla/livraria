import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';


interface CartState {
  items: any[]; 
}


const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      const newItem = action.payload;
      const isItemInCart = state.items.some(item => item.id === newItem.id);
      if (!isItemInCart) {
        state.items.push(newItem);
      }
     
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    
  },
});


export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;


export default cartSlice.reducer;