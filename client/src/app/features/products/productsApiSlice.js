import { apiSlice } from '../api/apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: 'PUT',
        body: product,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} = productsApiSlice
