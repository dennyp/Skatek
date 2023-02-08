import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

const productsAdapter = createEntityAdapter({})

const { REACT_APP_API_URL } = process.env

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/products`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    try {
      const productData = await axios.get(`${REACT_APP_API_URL}/products/${id}`)

      return productData.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product) => {
    try {
      const response = await axios.put(
        `${REACT_APP_API_URL}/products/${product._id}`,
        {
          name: product.name,
          placement: product.placement,
          department: product.department._id,
          location: product.location._id,
          productType: product.productType._id,
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/create',
  async (product) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/products`, {
        name: product.name,
        placement: product.placement,
        department: product.department,
        location: product.location,
        productType: product.productType,
      })

      return response
    } catch (error) {
      console.error(error)
    }
  }
)

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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, product) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.logs = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.logs = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.logs = action.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  },
})

export const { setProducts, setProduct } = productSlice.actions

export const selectAllProducts = (state) => state.product.logs
export const getProductsError = (state) => state.product.error
export const getProductsStatus = (state) => state.product.status

export default productSlice.reducer
