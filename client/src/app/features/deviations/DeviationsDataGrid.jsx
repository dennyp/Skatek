import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import DataGridActions from '../actions/DataGridActions'
import {
  useDeleteDeviationMutation,
  useGetDeviationsQuery,
} from './deviationsApiSlice'

const DeviationsDataGrid = ({ onEditClick }) => {
  const { isLoading, data = [] } = useGetDeviationsQuery()
  const [deleteDeviation] = useDeleteDeviationMutation()

  const columns = [
    {
      field: 'department',
      headerName: 'Avdelning',
      flex: 0.3,
      valueGetter: (params) => params.row?.department?.name,
    },
    {
      field: 'dateLogged',
      headerName: 'Datum',
      flex: 0.2,
      valueGetter: (params) => params.row?.date?.slice(0, 10),
    },
    { field: 'comment', headerName: 'Avvikelse', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.2,
      renderCell: (params) => (
        <DataGridActions {...{ params, onEditClick, onDeleteClick }} />
      ),
    },
  ]

  const onDeleteClick = (row) => {
    deleteDeviation(row._id)
  }

  return (
    <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
      <DataGrid
        rows={data}
        loading={isLoading}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </Box>
  )
}

export default DeviationsDataGrid
