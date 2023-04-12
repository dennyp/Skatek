import { apiSlice } from '../api/apiSlice'

export const documentsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Documents', 'Document'],
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: () => ({
        url: '/documents',
        method: 'GET',
      }),
      providesTags: ['Documents'],
    }),
    createDocuments: builder.mutation({
      query: (files) => ({
        url: '/documents',
        method: 'POST',
        body: files,
      }),
      invalidatesTags: ['Documents'],
    }),
  }),
})

export const { useGetDocumentsQuery, useCreateDocumentsMutation } =
  documentsApiSlice
