import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import TextInputGroup from '../../../components/TextInputGroup'
import DepartmentInputGroup from '../departments/DepartmentInputGroup'

const DeviationFormContent = ({
  setIsChanged,
  content,
  setContent,
  isLoading = false,
}) => {
  const handleDepartmentChange = (department) => {
    setContent({ ...content, department })
    setIsChanged?.(true)
  }

  const handleCommentChange = (comment) => {
    setContent({ ...content, comment })
    setIsChanged?.(true)
  }

  const handleDateChange = (event) => {
    setContent({ ...content, date: event.target.value })
    setIsChanged?.(true)
  }

  let formContent
  if (isLoading) {
    formContent = (
      <>
        <Box className="flex justify-center">
          <CircularProgress className="mt-20" size={84} />
        </Box>
      </>
    )
  } else {
    formContent = (
      <>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <DepartmentInputGroup
            value={content?.department}
            onChange={handleDepartmentChange}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <TextInputGroup
            label="Avvikelse"
            value={content?.comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <label
            htmlFor="date-logged"
            className="block text-xs font-medium text-gray-900"
          >
            Loggad datum
          </label>
          <input
            id="date-logged"
            type="date"
            value={content?.date.slice(0, 10)}
            onChange={handleDateChange}
            className="rounded-md border-gray-300"
          />
        </div>
      </>
    )
  }

  return formContent
}

export default DeviationFormContent
