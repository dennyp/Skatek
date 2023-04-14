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
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents', 'Document'],
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useCreateDocumentsMutation,
  useDeleteDocumentMutation,
} = documentsApiSlice
