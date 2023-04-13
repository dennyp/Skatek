import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import DocumentList from './DocumentList'
import {
  useCreateDocumentsMutation,
  useGetDocumentsQuery,
} from './documentsApiSlice'

function Documents() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const isAdmin = useSelector(selectCurrentIsAdmin)

  const { isLoading, data: documents } = useGetDocumentsQuery()

  const [createDocuments] = useCreateDocumentsMutation()

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
      {isAdmin && (
        <form onSubmit={handleFormSubmit}>
          <input type="file" onChange={handleFileSelect} multiple />
          <button type="submit">Ladda upp</button>
        </form>
      )}
      {!isLoading && <DocumentList files={documents} />}
    </>
  )
}

export default Documents
