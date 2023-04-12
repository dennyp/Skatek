// import GetApp from '@mui/icons-material/GetApp'
import InsertDriveFile from '@mui/icons-material/InsertDriveFile'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import DocumentDownloadButton from './DocumentDownloadButton'

const DocumentList = ({ files }) => {
  return (
    <List>
      {files.map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText primary={file.name} />
          <DocumentDownloadButton id={file._id} name={file.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default DocumentList
