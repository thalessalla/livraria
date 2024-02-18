import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
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


// setupListeners(store.dispatch)

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

