import { apiSlice } from '../api/apiSlice'

export const activityLogsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['ActivityLogs', 'ActivityLog'],
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: () => ({
        url: '/activitylogs',
        method: 'GET',
      }),
      providesTags: ['ActivityLogs'],
    }),
    getActivityLog: builder.query({
      query: () => ({
        url: '/activitylogs/:id',
        method: 'GET',
      }),
      providesTags: ['ActivityLog'],
    }),
    updateActivityLog: builder.mutation({
      query: (activitylog) => ({
        url: '/activitylogs/:id',
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
  useUpdateActivityLogMutation,
  useCreateActivityLogMutation,
  useDeleteActivityLogMutation,
} = activityLogsApiSlice
