import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useCallback, useState } from 'react'
import DataGridActions from '../actions/DataGridActions'
import {
  useDeleteActivityLogMutation,
  useGetActivityLogsQuery,
} from './activityLogsApiSlice'

const ActivityLogsDataGrid = ({ setRowId, setOpenEditSlider }) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [sort, setSort] = useState()
  const [search, setSearch] = useState('')

  const [queryOptions, setQueryOptions] = useState({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const { isLoading, data: logs = [] } = useGetActivityLogsQuery(queryOptions)
  const [deleteLog] = useDeleteActivityLogMutation()

  const onEditClick = (row) => {
    setOpenEditSlider(true)
    setRowId(row._id)
  }

  const onDeleteClick = (row) => {
    deleteLog(row._id)
  }

  const columns = [
    {
      field: 'product',
      headerName: 'Produkt',
      flex: 1,
      sortable: false,
      valueGetter: (params) => params.row?.product?.name,
    },
    {
      field: 'department',
      headerName: 'Avdelning',
      flex: 1,
      sortable: false,
      valueGetter: (params) => params.row?.product?.department?.name,
    },
    {
      field: 'dateLogged',
      headerName: 'Datum',
      flex: 1,
      valueGetter: (params) => params.row?.dateLogged?.slice(0, 10),
    },
    { field: 'activity', headerName: 'Aktivitet', flex: 1 },
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

  const handleFilterModelChange = useCallback(
    (model) => {
      setQueryOptions({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
        filter: model.items[0].value,
      })
    },
    [page, pageSize, search, sort]
  )

  const handleSortModelChange = (newModel) => {
    const sortParams = newModel.map((model) => ({
      field: model.field,
      direction: model.sort,
    }))

    setQueryOptions({
      page,
      pageSize,
      sort: JSON.stringify(...sortParams),
      search,
    })
  }

  return (
    <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
      <DataGrid
        loading={isLoading}
        getRowId={(row) => row._id}
        rows={(logs && logs.activityLogs) || []}
        columns={columns}
        rowCount={(logs && logs.total) || 0}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default ActivityLogsDataGrid
