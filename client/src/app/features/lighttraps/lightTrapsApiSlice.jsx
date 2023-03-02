import { apiSlice } from '../api/apiSlice'

export const lightTrapsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['LightTraps', 'LightTrap'],
  endpoints: (builder) => ({
    getLightTraps: builder.query({
      query: () => ({
        url: '/lighttraps',
        method: 'GET',
      }),
      providesTags: ['LightTraps'],
    }),
    createLightTrap: builder.mutation({
      query: (lighttrap) => ({
        url: '/lighttraps',
        method: 'POST',
        body: lighttrap,
      }),
      invalidatesTags: ['LightTraps'],
    }),
  }),
})

export const { useGetLightTrapsQuery, useCreateLightTrapMutation } =
  lightTrapsApiSlice
