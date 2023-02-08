import { createSlice } from '@reduxjs/toolkit'

const initialState = { productTypes: [] }

const productTypeSlice = createSlice({
  name: 'productTypes',
  initialState,
  reducers: {
    setProductTypes: (state, { payload }) => {
      state.productTypes = payload
    },
  },
})

export const { setProductTypes } = productTypeSlice.actions

export default productTypeSlice.reducer
