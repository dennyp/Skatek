import { CircularProgress } from '@mui/material'
import React from 'react'

const Skeleton = () => {
  return (
    <>
      <div className="flex justify-center">
        <CircularProgress size={96} className="mt-20" />
      </div>
    </>
  )
}

export default Skeleton
