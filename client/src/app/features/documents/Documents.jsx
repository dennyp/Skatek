import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import DocumentList from './DocumentList'
import DocumentUpload from './DocumentUpload'
import { useGetDocumentsQuery } from './documentsApiSlice'

const Documents = () => {
  const isAdmin = useSelector(selectCurrentIsAdmin)

  const { isLoading, data: documents } = useGetDocumentsQuery()

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Dokument</h1>
            <p className="my-2 text-sm text-gray-700">
              Nedan listas dokument innehållande uppmätt aktivitet för alla
              avdelningar.
            </p>
          </div>
        </div>
        <div className="flex bg-white border mx-4 py-4 sm:rounded-lg sm:px-4">
          {isAdmin && <DocumentUpload />}
        </div>
        {!isLoading && <DocumentList files={documents} />}
      </div>
    </>
  )
}

export default Documents
