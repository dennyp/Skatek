import { createSlice } from '@reduxjs/toolkit'

const initialState = { departments: [] }

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments: (state, { payload }) => {
      state.departments = payload
    },
  },
})

export const { setDepartments } = departmentSlice.actions

export default departmentSlice.reducer
