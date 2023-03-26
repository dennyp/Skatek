import React, { useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddButton from '../../../components/AddButton'
import DataGridActions from '../actions/DataGridActions'
import {
  useDeleteActivityLogMutation,
  useGetActivityLogsQuery,
} from './activityLogsApiSlice'
import ActivityLogSlideover from './ActivityLogSlideover'
import AddActivityLogSlideover from './AddActivityLogSlideover'

const ActivityLogs = () => {
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [openAddSlider, setOpenAddSlider] = useState(false)

  const [rowId, setRowId] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const {
    isLoading,
    error,
    data: logs,
  } = useGetActivityLogsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const [deleteLog, response] = useDeleteActivityLogMutation()

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

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Aktivitetsloggar
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas alla aktivitetsloggar som finns skapade.
            </p>
          </div>
          <AddButton openSlider={setOpenAddSlider} />
        </div>
        <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
          <DataGrid
            loading={isLoading || !logs}
            getRowId={(row) => row._id}
            rows={(logs && logs.activityLogs) || []}
            columns={columns}
            rowCount={(logs && logs.total) || 0}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        {openEditSlider && (
          <ActivityLogSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            id={rowId}
          />
        )}
        {openAddSlider && (
          <AddActivityLogSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default ActivityLogs
