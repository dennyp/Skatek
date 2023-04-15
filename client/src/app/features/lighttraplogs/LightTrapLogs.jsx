import React, { useState } from 'react'

import AddButton from '../../../components/AddButton'
import AddLightTrapLogSlideover from './AddLightTrapLogSlideover'
import LightTrapLogsDataGrid from './LightTrapLogsDataGrid'

const LightTrapLogs = () => {
  // const [openEditSlider, setOpenEditSlider] = useState(false)
  const [rowId, setRowId] = useState('')
  const [openAddSlider, setOpenAddSlider] = useState(false)

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Aktivitet ljusfällor
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas loggad aktivitet för ljusfällor.
            </p>
          </div>
          <AddButton openSlider={setOpenAddSlider} />
        </div>
        <LightTrapLogsDataGrid setRowId={setRowId} />
        {/* {openEditSlider && (
          <ActivityLogSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            id={rowId}
          />
        )} */}
        {openAddSlider && (
          <AddLightTrapLogSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default LightTrapLogs
