import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useState } from 'react'
import DataGridActions from '../actions/DataGridActions'
import {
  useDeleteLightTrapLogMutation,
  useGetLightTrapLogsQuery,
} from './lightTrapLogsApiSlice'

const LightTrapLogsDataGrid = ({ setRowId, setOpenEditSlider }) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [deleteLog] = useDeleteLightTrapLogMutation()

  const { isLoading, data: logs } = useGetLightTrapLogsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const onEditClick = (row) => {
    // setOpenEditSlider(true)
    setRowId(row._id)
  }

  const onDeleteClick = (row) => {
    deleteLog(row._id)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Märke',
      flex: 1,
      valueGetter: (params) => params.row?.product?.name,
    },
    {
      field: 'department',
      headerName: 'Avdelning',
      flex: 1,
      valueGetter: (params) => params.row?.product?.department?.name,
    },
    {
      field: 'dateLogged',
      headerName: 'Datum',
      flex: 1,
      valueGetter: (params) => params.row?.dateLogged?.slice(0, 10),
    },
    { field: 'comment', headerName: 'Kommentar', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      renderCell: (params) => (
        <DataGridActions {...{ params, onEditClick, onDeleteClick }} />
      ),
    },
  ]
  return (
    <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
      <DataGrid
        loading={isLoading || !logs}
        getRowId={(row) => row._id}
        rows={(logs && logs.lightTrapLogs) || []}
        columns={columns}
        rowCount={(logs && logs.total) || 0}
        pagination
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default LightTrapLogsDataGrid
