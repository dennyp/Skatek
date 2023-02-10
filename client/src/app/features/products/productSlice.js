import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const productsAdapter = createEntityAdapter({})

export const productSlice = createSlice({
  name: 'product',
  initialState: productsAdapter.getInitialState({
    product: {},
    products: [],
    error: null,
    status: 'idle',
  }),
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload
    },
    setProduct: (state, { payload }) => {
      state.product = payload
    },
    updateProducts: (state, { payload }) => {
      const products = state.products.map((product) => {
        return product._id === payload._id ? payload : product
      })
      state.products = products
    },
  },
})

export const { setProducts, setProduct, updateProducts } = productSlice.actions

export const selectAllProducts = (state) => state.products
export const getProductsError = (state) => state.product.error
export const getProductsStatus = (state) => state.product.status

export default productSlice.reducer
