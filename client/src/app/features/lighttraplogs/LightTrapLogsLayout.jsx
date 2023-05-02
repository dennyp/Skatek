import React, { useState } from 'react'

import AddButton from '../../../components/AddButton'
import AddLightTrapLogSlideover from './AddLightTrapLogSlideover'
import LightTrapLogsDataGrid from './LightTrapLogsDataGrid'
import LightTrapLogSlideover from './LightTrapLogSlideover'

const LightTrapLogsLayout = () => {
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [rowId, setRowId] = useState(null)

  const onEditClick = (row) => {
    setOpenEditSlider(true)
    setRowId(row._id)
  }

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
          <AddButton openSlider={setOpenAddSlider} text="Lägg till" />
        </div>
        <LightTrapLogsDataGrid onEditClick={onEditClick} />

        {openAddSlider && (
          <AddLightTrapLogSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
        {openEditSlider && (
          <LightTrapLogSlideover
            id={rowId}
            open={openEditSlider}
            setOpen={setOpenEditSlider}
          />
        )}
      </div>
    </>
  )
}

export default LightTrapLogsLayout
