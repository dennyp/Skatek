import { Delete, Edit } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import EditPlanModal from './EditPlanModal'
import { useDeletePlanMutation } from './plansApiSlice'

const PlanItem = ({ plan }) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  const isAdmin = useSelector(selectCurrentIsAdmin)

  const [deletePlan, { isLoading: isLoadingDelete }] = useDeletePlanMutation()

  const successMessage = () => toast.success('Ritning raderad')
  const failureMessage = () => toast.error('Ritning kunde inte raderas')

  const handleEditClick = (plan) => {
    setOpenEditModal(true)
  }

  const handleDeleteClick = async (plan) => {
    try {
      const response = await deletePlan(plan._id)

      if (!response.error) {
        successMessage()
      }
    } catch (error) {
      console.error('error deleting plan', error)
      failureMessage()
    }
  }
  return (
    <>
      <Box>
        <div className="flex justify-center">
          <div className="w-2/3 mb-10 p-3 border-2 border-gray-100 rounded-xl">
            {isAdmin && (
              <div className="text-right">
                <Tooltip title="Ändra">
                  <IconButton onClick={() => handleEditClick(plan)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                {isLoadingDelete ? (
                  <CircularProgress size={24} />
                ) : (
                  <Tooltip title="Radera">
                    <IconButton onClick={() => handleDeleteClick(plan)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
            <div>
              <p className="pb-2 text-lg text-gray-900 text-center">
                {plan.name}
              </p>
              <p className="pb-2 text-sm text-gray-900 text-center">
                {plan.desc}
              </p>
            </div>
            <img src={plan.img.url} alt={plan.desc} title={plan.name} />
          </div>
        </div>
      </Box>
      <div>
        {openEditModal && (
          <EditPlanModal
            title="Ändra ritning"
            plan={plan}
            open={openEditModal}
            setOpen={setOpenEditModal}
          />
        )}
      </div>
    </>
  )
}

export default PlanItem
