import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from '../slices/bookApiSlice'
import cartReducer from '../slices/CartSlices';
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

