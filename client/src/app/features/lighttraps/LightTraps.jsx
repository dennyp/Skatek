import React, { useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DataGridActions from '../actions/DataGridActions'
import AddLightTrapSlideover from './AddLightTrapSlideover'
import { useGetLightTrapsQuery } from './lightTrapsApiSlice'
import LightTrapSlideover from './LightTrapSlideover'

const LightTraps = () => {
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [lightTrapId, setLightTrapId] = useState('')

  const { isLoading, error, data: lightTraps } = useGetLightTrapsQuery()

  const onEditClick = (row) => {
    setOpenEditSlider(true)
    setLightTrapId(row._id)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Märke',
      flex: 1,
      valueGetter: (params) => params.row?.name,
    },
    {
      field: 'placement',
      headerName: 'Placering',
      flex: 3,
    },
    {
      field: 'department',
      headerName: 'Avdelning',
      flex: 1,
      valueGetter: (params) => params.row?.department?.name,
    },
    {
      field: 'productType',
      headerName: 'Produkttyp',
      flex: 1,
      valueGetter: (params) => params.row?.productType?.name,
    },
    {
      field: 'isActive',
      headerName: 'Aktiv',
      flex: 1,
      valueGetter: (params) => params.row?.isActive,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      renderCell: (params) => <DataGridActions {...{ params, onEditClick }} />,
    },
  ]

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Ljusfällor</h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas alla ljusfällor från alla avdelningar.
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
            loading={isLoading || !lightTraps}
            getRowId={(lightTrap) => lightTrap._id}
            rows={lightTraps || []}
            columns={columns}
          />
        </Box>
        {openEditSlider && (
          <LightTrapSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            id={lightTrapId}
          />
        )}
        {openAddSlider && (
          <AddLightTrapSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default LightTraps
