// import GetApp from '@mui/icons-material/GetApp'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch } from 'react-redux'
import DataGridActions from '../actions/DataGridActions'
import { downloadFile } from './documentSlice'
import { useDeleteDocumentMutation } from './documentsApiSlice'

const DocumentList = ({ files }) => {
  const dispatch = useDispatch()

  const [deleteDocument] = useDeleteDocumentMutation()

  const onDownloadClick = (row) => {
    dispatch(downloadFile({ id: row._id, name: row.name }))
  }

  const onDeleteClick = (row) => {
    deleteDocument(row._id)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Namn',
      flex: 1,
      renderCell: (params) => {
        const name = params.row?.name
        return (
          <>
            <InsertDriveFileOutlinedIcon className="mr-2" />
            {name}
          </>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.1,
      renderCell: (params) => (
        <DataGridActions {...{ params, onDeleteClick, onDownloadClick }} />
      ),
    },
  ]

  return (
    <>
      <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
        <DataGrid
          getRowId={(file) => file._id}
          rows={files}
          columns={columns}
        />
      </Box>
    </>
  )
}

export default DocumentList
