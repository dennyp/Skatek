import { createSlice } from '@reduxjs/toolkit'

const initialState = { locations: [] }

const locationSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setLocations: (state, { payload }) => {
      state.locations = payload
    },
  },
})

export const { setLocations } = locationSlice.actions

export default locationSlice.reducer
