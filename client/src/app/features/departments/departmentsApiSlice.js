import { apiSlice } from '../api/apiSlice'

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: '/departments',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDepartmentsQuery } = departmentsApiSlice
