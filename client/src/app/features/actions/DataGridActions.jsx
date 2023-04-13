import { Delete, Edit, GetApp } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentIsAdmin } from '../auth/authSlice'

const DataGridActions = ({
  params,
  onEditClick,
  onDeleteClick,
  onDownloadClick,
}) => {
  const isAdmin = useSelector(selectCurrentIsAdmin)

  let downloadAction
  if (onDownloadClick !== undefined) {
    downloadAction = (
      <Tooltip title="Ladda ned">
        <IconButton onClick={() => onDownloadClick(params.row)}>
          <GetApp />
        </IconButton>
      </Tooltip>
    )
  }

  let editAction
  if (onEditClick !== undefined) {
    if (isAdmin) {
      editAction = (
        <Tooltip title="Ändra">
          <IconButton onClick={() => onEditClick(params.row)}>
            <Edit />
          </IconButton>
        </Tooltip>
      )
    }
  }

  let deleteAction
  if (onDeleteClick !== undefined) {
    if (isAdmin) {
      deleteAction = (
        <Tooltip title="Radera">
          <IconButton onClick={() => onDeleteClick(params.row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      )
    }
  }

  return (
    <Box>
      {downloadAction}
      {editAction}
      {deleteAction}
    </Box>
  )
}

export default DataGridActions
