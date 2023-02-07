import { configureStore } from '@reduxjs/toolkit'
import activitylogReducer from './features/activitylogs/activitylogSlice'
import { apiSlice } from './features/api/apiSlice'
import authReducer from './features/auth/authSlice'
import productReducer from './features/products/productSlice'

export const store = configureStore({
  reducer: {
    activity: activitylogReducer,
    product: productReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})
