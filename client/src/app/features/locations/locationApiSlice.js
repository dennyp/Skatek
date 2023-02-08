import { apiSlice } from '../api/apiSlice'

export const locationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => ({
        url: '/locations',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetLocationsQuery } = locationApiSlice
