// import GetApp from '@mui/icons-material/GetApp'
import InsertDriveFile from '@mui/icons-material/InsertDriveFile'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch } from 'react-redux'
import DataGridActions from '../actions/DataGridActions'
import { downloadFile } from './documentSlice'

const DocumentList = ({ files }) => {
  const dispatch = useDispatch()

  const onDownloadClick = (row) => {
    dispatch(downloadFile({ id: row._id, name: row.name }))
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
            <InsertDriveFile className="mr-2" />
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
        <DataGridActions {...{ params, onDownloadClick }} />
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
