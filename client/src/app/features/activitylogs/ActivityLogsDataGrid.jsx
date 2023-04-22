import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useCallback, useState } from 'react'
import DataGridActions from '../actions/DataGridActions'
import {
  useDeleteActivityLogMutation,
  useGetActivityLogsQuery,
} from './activityLogsApiSlice'

const ActivityLogsDataGrid = ({ setRowId, setOpenEditSlider }) => {
  const [queryOptions, setQueryOptions] = useState({
    page: 0,
    pageSize: 100,
    sort: null,
    search: '',
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
        ...queryOptions,
        filter: model.items[0].value,
      })
    },
    [queryOptions]
  )

  const handleSortModelChange = (newModel) => {
    const sortParams = newModel.map((model) => ({
      field: model.field,
      direction: model.sort,
    }))

    setQueryOptions({
      ...queryOptions,
      sort: JSON.stringify(...sortParams),
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
        page={queryOptions?.page}
        pageSize={queryOptions?.pageSize}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPageChange={(newPage) =>
          setQueryOptions({ ...queryOptions, page: newPage })
        }
        onPageSizeChange={(newPageSize) =>
          setQueryOptions({ ...queryOptions, pageSize: newPageSize })
        }
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default ActivityLogsDataGrid
