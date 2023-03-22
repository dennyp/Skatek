import { createSlice } from '@reduxjs/toolkit'

const initialState = { departments: [], selected: {} }

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments: (state, { payload }) => {
      state.departments = payload
    },
    setSelectedDepartment: (state, { payload }) => {
      state.selected = payload
    },
  },
})

export const { setDepartments, setSelectedDepartment } = departmentSlice.actions

export default departmentSlice.reducer

export const selectedDepartment = (state) => state.selected
