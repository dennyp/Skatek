import { configureStore } from '@reduxjs/toolkit'
import activitylogReducer from './features/activitylogs/activitylogSlice'

export const store = configureStore({
  reducer: { activity: activitylogReducer },
})
