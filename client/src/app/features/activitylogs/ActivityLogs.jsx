import React, { useState } from 'react'

import AddButton from '../../../components/AddButton'
import ActivityLogSlideover from './ActivityLogSlideover'
import ActivityLogsDataGrid from './ActivityLogsDataGrid'
import AddActivityLogSlideover from './AddActivityLogSlideover'

const ActivityLogs = () => {
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [rowId, setRowId] = useState('')

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Aktivitetsloggar
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas alla aktivitetsloggar som finns skapade.
            </p>
          </div>
          <AddButton openSlider={setOpenAddSlider} />
        </div>
        <ActivityLogsDataGrid
          setRowId={setRowId}
          setOpenEditSlider={setOpenEditSlider}
        />
        {openEditSlider && (
          <ActivityLogSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            id={rowId}
          />
        )}
        {openAddSlider && (
          <AddActivityLogSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default ActivityLogs
