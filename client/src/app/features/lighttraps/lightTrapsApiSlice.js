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
    getLightTrapsFromDepartment: builder.query({
      query: (id) => ({
        url: `/lighttraps/department/${id}`,
        method: 'GET',
      }),
    }),
    getLightTrap: builder.query({
      query: (id) => ({
        url: `/lighttraps/${id}`,
        method: 'GET',
      }),
      providesTags: ['LightTrap'],
    }),
    createLightTrap: builder.mutation({
      query: (lighttrap) => ({
        url: '/lighttraps',
        method: 'POST',
        body: lighttrap,
      }),
      invalidatesTags: ['LightTraps'],
    }),
    updateLightTrap: builder.mutation({
      query: (lighttrap) => ({
        url: `/lighttraps/${lighttrap._id}`,
        method: 'PUT',
        body: lighttrap,
      }),
      invalidatesTags: ['LightTraps', 'LightTrap'],
    }),
  }),
})

export const {
  useGetLightTrapsQuery,
  useGetLightTrapQuery,
  useGetLightTrapsFromDepartmentQuery,
  useCreateLightTrapMutation,
  useUpdateLightTrapMutation,
} = lightTrapsApiSlice
