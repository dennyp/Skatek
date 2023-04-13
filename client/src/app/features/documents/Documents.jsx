import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import DocumentList from './DocumentList'
import {
  useCreateDocumentsMutation,
  useGetDocumentsQuery,
} from './documentsApiSlice'

const Documents = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const isAdmin = useSelector(selectCurrentIsAdmin)

  const { isLoading, data: documents } = useGetDocumentsQuery()

  const [createDocuments, { isLoading: isLoadingCreate }] =
    useCreateDocumentsMutation()

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files])
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    selectedFiles.forEach((file) => {
      formData.append('files', file)
    })

    await createDocuments(formData)
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Dokument</h1>
            <p className="my-2 text-sm text-gray-700">
              Nedan listas dokument innehållande uppmätt aktivitet för alla
              avdelningar under året.
            </p>
          </div>
        </div>
        <div className="flex bg-white border mx-4 py-4 sm:rounded-lg sm:px-4">
          {isAdmin && (
            <form className="space-y-3 w-full" onSubmit={handleFormSubmit}>
              <label
                className="text-sm font-medium text-gray-900"
                for="multi-upload"
              >
                Ladda upp filer
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="multi-upload"
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".xlsx"
              />
              <button
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                disabled={isLoadingCreate ? true : false}
              >
                {isLoadingCreate ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Ladda upp'
                )}
              </button>
            </form>
          )}
        </div>
        {!isLoading && <DocumentList files={documents} />}
      </div>
    </>
  )
}

export default Documents
