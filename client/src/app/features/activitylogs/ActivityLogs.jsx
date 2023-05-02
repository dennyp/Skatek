import React, { useState } from 'react'

import AddButton from '../../../components/AddButton'
import ActivityLogSlideover from './ActivityLogSlideover'
import ActivityLogsDataGrid from './ActivityLogsDataGrid'
import AddActivityLogSlideover from './AddActivityLogSlideover'
import AddActivityLogsModal from './AddActivityLogsModal'

const ActivityLogs = () => {
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [openSingleAddSlider, setOpenSingleAddSlider] = useState(false)
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
          <div className="flex justify-end">
            <AddButton
              openSlider={setOpenSingleAddSlider}
              text="Lägg till en"
            />
            <AddButton openSlider={setOpenAddSlider} text="Lägg till många" />
          </div>
        </div>
        <ActivityLogsDataGrid
          setRowId={setRowId}
          setOpenEditSlider={setOpenEditSlider}
        />
        {openSingleAddSlider && (
          <AddActivityLogSlideover
            open={openSingleAddSlider}
            setOpen={setOpenSingleAddSlider}
          />
        )}
        {openAddSlider && (
          <AddActivityLogsModal
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
        {openEditSlider && (
          <ActivityLogSlideover
            id={rowId}
            open={openEditSlider}
            setOpen={setOpenEditSlider}
          />
        )}
      </div>
    </>
  )
}

export default ActivityLogs
