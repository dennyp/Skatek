import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { API, graphqlOperation } from 'aws-amplify'
import { listProductsWithExtraInfo } from '../../../graphql/custom-queries'
import { createProduct as createProd } from '../../../graphql/mutations'

const productsAdapter = createEntityAdapter({})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productData = await API.graphql(
      graphqlOperation(listProductsWithExtraInfo, { limit: 1000 })
    )
    return productData.data.listProducts.items
  }
)

export const createProduct = createAsyncThunk(
  'product/create',
  async (product) => {
    try {
      const response = await API.graphql(graphqlOperation(createProd, product))
      return response.data.createProduct
    } catch (err) {
      console.error(err)
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState: productsAdapter.getInitialState({
    selectedProduct: {},
    products: [],
    error: null,
    status: 'idle',
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.logs = action.payload
    })
  },
})

export const selectAllProducts = (state) => state.product.logs
export const getProductsError = (state) => state.product.error
export const getProductsStatus = (state) => state.product.status

export default productSlice.reducer
