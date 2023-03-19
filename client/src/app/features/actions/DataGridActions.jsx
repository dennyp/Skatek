import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

const DataGridActions = ({ params, onEditClick, onDeleteClick }) => {
  let deleteAction
  if (onDeleteClick !== undefined) {
    deleteAction = (
      <Tooltip title="Radera">
        <IconButton onClick={() => onDeleteClick(params.row)}>
          <Delete />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Box>
      <Tooltip title="Ändra">
        <IconButton onClick={() => onEditClick(params.row)}>
          <Edit />
        </IconButton>
      </Tooltip>
      {deleteAction}
    </Box>
  )
}

export default DataGridActions
