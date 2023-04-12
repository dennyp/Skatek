import GetApp from '@mui/icons-material/GetApp'
import { IconButton, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { downloadFile } from './documentSlice'

const DocumentDownloadButton = ({ id, name }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(downloadFile({ id, name }))
  }

  const content = (
    <Tooltip title="Ladda ned">
      <IconButton onClick={handleClick}>
        <GetApp />
      </IconButton>
    </Tooltip>
  )

  return content
}

export default DocumentDownloadButton
