import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const { REACT_APP_API_URL } = process.env

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({}),
})
