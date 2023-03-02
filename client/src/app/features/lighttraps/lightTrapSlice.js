import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const lightTrapSlice = createSlice({
  name: 'lighttrap',
  initialState: {
    lightTraps: [],
  },
  reducers: {},
})

export default lightTrapSlice.reducer
