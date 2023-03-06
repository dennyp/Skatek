import React, { useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddLightTrapLogSlideover from './AddLightTrapLogSlideover'
import { useGetLightTrapLogsQuery } from './lightTrapLogsApiSlice'

const LightTrapLogs = () => {
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [openAddSlider, setOpenAddSlider] = useState(false)

  const [logId, setLogId] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const {
    isLoading,
    error,
    data: logs,
  } = useGetLightTrapLogsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const onEditClick = (e, row) => {
    e.stopPropagation()

    setOpenEditSlider(true)
    setLogId(row._id)
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
      headerName: 'Ändra',
      flex: 0.3,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => onEditClick(e, params.row)}
            variant="contained"
          >
            Ändra
          </button>
        )
      },
    },
  ]

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Aktivitet ljusfällor
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas loggad aktivitet för ljusfällor.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpenAddSlider(true)}
            >
              Lägg till
            </button>
          </div>
        </div>
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
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        {/* {openEditSlider && (
          <ActivityLogSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            id={logId}
          />
        )} */}
        {openAddSlider && (
          <AddLightTrapLogSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default LightTrapLogs
