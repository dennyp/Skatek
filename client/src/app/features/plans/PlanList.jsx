import React, { Fragment } from 'react'
import PlanItem from './PlanItem'
import { useGetPlansFromDepartmentQuery } from './plansApiSlice'

const PlanList = ({ department }) => {
  const { isLoading, data: plans } = useGetPlansFromDepartmentQuery(
    department._id
  )

  let content
  if (!isLoading) {
    content = plans.map((plan) => {
      return (
        <Fragment key={plan._id}>
          <PlanItem plan={plan} />
        </Fragment>
      )
    })
  }

  return content
}

export default PlanList
