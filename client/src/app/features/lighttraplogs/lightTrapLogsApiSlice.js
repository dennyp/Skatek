import { apiSlice } from '../api/apiSlice'

export const lightTrapLogsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['LightTrapLogs', 'LightTrapLog'],
  endpoints: (builder) => ({
    getLightTrapLogs: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: '/lighttraplogs',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['LightTrapLogs'],
    }),
    getLightTrapLogsWithSearch: builder.query({
      query: ({ search }) => ({
        url: '/lighttraplogs',
        method: 'GET',
        params: { search },
      }),
      providesTags: ['LightTrapLog'],
    }),
    createLightTrapLog: builder.mutation({
      query: (lightTrapLog) => ({
        url: '/lighttraplogs',
        method: 'POST',
        body: lightTrapLog,
      }),
      invalidatesTags: ['LightTrapLogs'],
    }),
  }),
})

export const { useGetLightTrapLogsQuery, useCreateLightTrapLogMutation } =
  lightTrapLogsApiSlice
