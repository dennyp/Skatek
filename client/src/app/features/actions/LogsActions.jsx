import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

const LogsActions = ({ params, onEditClick, onDeleteClick }) => {
  return (
    <Box>
      <Tooltip title="Ändra">
        <IconButton onClick={() => onEditClick(params.row)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Radera">
        <IconButton onClick={() => onDeleteClick(params.row)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default LogsActions
