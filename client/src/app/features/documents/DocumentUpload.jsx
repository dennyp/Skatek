import React, { useState } from 'react'
import { useCreateDocumentsMutation } from './documentsApiSlice'

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([])

  const [createDocuments, { isLoading }] = useCreateDocumentsMutation()

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
    <form className="space-y-3 w-full" onSubmit={handleFormSubmit}>
      <label
        className="text-sm font-medium text-gray-900"
        htmlFor="multi-upload"
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
        disabled={isLoading ? true : false}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
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
  )
}

export default DocumentUpload
