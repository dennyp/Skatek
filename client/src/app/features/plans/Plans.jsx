import { Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentIsAdmin } from '../auth/authSlice'
import EditPlanModal from './EditPlanModal'
import { useGetPlansFromDepartmentQuery } from './plansApiSlice'

const Plans = ({ department }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [plan, setPlan] = useState({})

  const isAdmin = useSelector(selectCurrentIsAdmin)

  const {
    isLoading,
    error,
    data: plans,
  } = useGetPlansFromDepartmentQuery(department._id)

  const handleEditClick = (plan) => {
    setOpenEditModal(true)
    setPlan(plan)
  }

  let content
  if (!isLoading) {
    content = plans.map((plan) => {
      return (
        <Fragment key={plan._id}>
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
        </Fragment>
      )
    })
  }

  return (
    <Fragment>
      {content}
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
    </Fragment>
  )
}

export default Plans
