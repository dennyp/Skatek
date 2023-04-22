import { Delete, Edit, GetApp } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteModal from '../../../components/DeleteModal'
import { selectCurrentIsAdmin } from '../auth/authSlice'

const DataGridActions = ({
  params,
  onEditClick,
  onDeleteClick,
  onDownloadClick,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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
        <>
          <Tooltip title="Radera">
            <IconButton onClick={() => setShowDeleteModal(true)}>
              <Delete />
            </IconButton>
          </Tooltip>
          {showDeleteModal && (
            <DeleteModal
              setShow={setShowDeleteModal}
              onConfirmDeleteClick={() => onDeleteClick(params.row)}
            />
          )}
        </>
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
