import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddButton from '../../../components/AddButton'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import AddDeviationSlideover from './AddDeviationSlideover'
import DeviationSlideover from './DeviationSlideover'
import DeviationsDataGrid from './DeviationsDataGrid'

const DeviationsLayout = () => {
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [rowId, setRowId] = useState(null)

  const isAdmin = useSelector(selectCurrentIsAdmin)

  const onEditClick = (row) => {
    setOpenEditSlider(true)
    setRowId(row._id)
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Avvikelser</h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas avvikelser för alla avdelningar.
            </p>
          </div>
          {isAdmin && (
            <AddButton openSlider={setOpenAddSlider} text="Lägg till" />
          )}
        </div>
        <DeviationsDataGrid onEditClick={onEditClick} />
        {openAddSlider && (
          <AddDeviationSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
        {openEditSlider && (
          <DeviationSlideover
            id={rowId}
            open={openEditSlider}
            setOpen={setOpenEditSlider}
          />
        )}
      </div>
    </>
  )
}

export default DeviationsLayout
