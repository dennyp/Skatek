import { apiSlice } from '../api/apiSlice'

export const plansApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Plans', 'Plan'],
  endpoints: (builder) => ({
    getPlansFromDepartment: builder.query({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'GET',
      }),
      providesTags: ['Plans'],
    }),
    createPlan: builder.mutation({
      query: (plan) => ({
        url: '/plans',
        method: 'POST',
        body: plan,
      }),
      invalidatesTags: ['Plans'],
    }),
    updatePlan: builder.mutation({
      query: (plan) => ({
        url: `/plans/${plan.get('_id')}`,
        method: 'PUT',
        body: plan,
      }),
      invalidatesTags: ['Plans', 'Plan'],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plans', 'Plan'],
    }),
  }),
})

export const {
  useGetPlansFromDepartmentQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApiSlice
