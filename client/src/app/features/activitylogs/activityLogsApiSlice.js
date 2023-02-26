import { apiSlice } from '../api/apiSlice'

export const activityLogsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['ActivityLogs', 'ActivityLog'],
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: '/activitylogs',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['ActivityLogs'],
    }),
    getVisualActivityLogs: builder.query({
      query: ({
        department,
        dateStart,
        dateEnd,
        dateStartTwo,
        dateEndTwo,
      }) => ({
        url: '/activitylogs/visual',
        method: 'GET',
        params: { department, dateStart, dateEnd, dateStartTwo, dateEndTwo },
      }),
      providesTags: ['ActivityLogs'],
    }),
    getActivityLog: builder.query({
      query: (id) => ({
        url: `/activitylogs/${id}`,
        method: 'GET',
      }),
      providesTags: ['ActivityLog'],
    }),
    updateActivityLog: builder.mutation({
      query: (activitylog) => ({
        url: `/activitylogs/${activitylog._id}`,
        method: 'PUT',
        body: activitylog,
      }),
      invalidatesTags: ['ActivityLogs', 'ActivityLog'],
    }),
    createActivityLog: builder.mutation({
      query: (activitylog) => ({
        url: '/activitylogs',
        method: 'POST',
        body: activitylog,
      }),
      invalidatesTags: ['ActivityLogs'],
    }),
    deleteActivityLog: builder.mutation({
      query: (id) => ({
        url: `/activitylogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ActivityLogs'],
    }),
  }),
})

export const {
  useGetActivityLogsQuery,
  useGetActivityLogQuery,
  useGetVisualActivityLogsQuery,
  useUpdateActivityLogMutation,
  useCreateActivityLogMutation,
  useDeleteActivityLogMutation,
} = activityLogsApiSlice
