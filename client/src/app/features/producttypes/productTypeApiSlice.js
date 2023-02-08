import { apiSlice } from '../api/apiSlice'

export const productTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductTypes: builder.query({
      query: () => ({
        url: '/producttypes',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProductTypesQuery } = productTypeApiSlice
