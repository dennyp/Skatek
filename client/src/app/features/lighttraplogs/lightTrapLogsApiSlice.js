import { apiSlice } from '../api/apiSlice'

export const lightTrapLogsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['LightTrapLogs', 'LightTrapLog'],
  endpoints: (builder) => ({
    getLightTrapLog: builder.query({
      query: (id) => ({
        url: `/lighttraplogs/${id}`,
        method: 'GET',
      }),
      providesTags: ['LightTrapLog'],
    }),
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
    getVisualLightTrapLogsPerInsect: builder.query({
      query: ({ department, dateStart, dateEnd }) => ({
        url: '/lighttraplogs/visual-per-insect',
        method: 'GET',
        params: { department, dateStart, dateEnd },
      }),
    }),
    getVisualLightTrapLogsForTrap: builder.query({
      query: ({ trap, dateStart, dateEnd, dateStartTwo, dateEndTwo }) => ({
        url: '/lighttraplogs/visual-for-trap',
        method: 'GET',
        params: { trap, dateStart, dateEnd, dateStartTwo, dateEndTwo },
      }),
    }),
    getVisualTotalLightTrapLogs: builder.query({
      query: ({
        department,
        dateStart,
        dateEnd,
        dateStartTwo,
        dateEndTwo,
      }) => ({
        url: '/lighttraplogs/visual-total',
        method: 'GET',
        params: { department, dateStart, dateEnd, dateStartTwo, dateEndTwo },
      }),
    }),
    createLightTrapLog: builder.mutation({
      query: (lightTrapLog) => ({
        url: '/lighttraplogs',
        method: 'POST',
        body: lightTrapLog,
      }),
      invalidatesTags: ['LightTrapLogs'],
    }),
    deleteLightTrapLog: builder.mutation({
      query: (id) => ({
        url: `/lighttraplogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LightTrapLogs'],
    }),
    updateLightTrapLog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/lighttraplogs/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['LightTrapLogs', 'LightTrapLog'],
    }),
  }),
})

export const {
  useGetLightTrapLogQuery,
  useGetLightTrapLogsQuery,
  useGetVisualLightTrapLogsPerInsectQuery,
  useGetVisualTotalLightTrapLogsQuery,
  useGetVisualLightTrapLogsForTrapQuery,
  useCreateLightTrapLogMutation,
  useDeleteLightTrapLogMutation,
  useUpdateLightTrapLogMutation,
} = lightTrapLogsApiSlice
