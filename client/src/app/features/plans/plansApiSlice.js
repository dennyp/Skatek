import { apiSlice } from '../api/apiSlice'

export const plansApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Plans'],
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
  }),
})

export const { useGetPlansFromDepartmentQuery, useCreatePlanMutation } =
  plansApiSlice
