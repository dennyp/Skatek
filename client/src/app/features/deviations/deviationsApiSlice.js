import { apiSlice } from '../api/apiSlice'

export const deviationsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Deviations', 'Deviation'],
  endpoints: (builder) => ({
    getDeviations: builder.query({
      query: () => ({
        url: '/deviations',
        method: 'GET',
      }),
      providesTags: ['Deviations'],
    }),
    getDeviation: builder.query({
      query: (id) => ({
        url: `/deviations/${id}`,
        method: 'GET',
      }),
      providesTags: ['Deviation'],
    }),
    createDeviation: builder.mutation({
      query: (deviation) => ({
        url: '/deviations',
        method: 'POST',
        body: deviation,
      }),
      invalidatesTags: ['Deviations'],
    }),
    deleteDeviation: builder.mutation({
      query: (id) => ({
        url: `/deviations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deviations'],
    }),
    updateDeviation: builder.mutation({
      query: ({ id, ...deviation }) => ({
        url: `/deviations/${id}`,
        method: 'PUT',
        body: deviation,
      }),
      invalidatesTags: ['Deviation', 'Deviations'],
    }),
  }),
})

export const {
  useGetDeviationsQuery,
  useGetDeviationQuery,
  useCreateDeviationMutation,
  useDeleteDeviationMutation,
  useUpdateDeviationMutation,
} = deviationsApiSlice
