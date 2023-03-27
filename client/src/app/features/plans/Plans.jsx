import React, { Fragment } from 'react'
import { useGetPlansFromDepartmentQuery } from './plansApiSlice'

const Plans = ({ department }) => {
  const {
    isLoading,
    error,
    data: plans,
  } = useGetPlansFromDepartmentQuery(department._id)

  let content
  if (!isLoading) {
    content = plans.map((plan) => {
      return (
        <Fragment>
          <div className="flex justify-center">
            <div className="w-2/3 mb-10 p-3 border-2 border-gray-100 rounded-xl">
              <p className="pb-2 text-lg text-gray-900 text-center">
                {plan.name}
              </p>
              <p className="pb-2 text-sm text-gray-900 text-center">
                {plan.desc}
              </p>
              <img src={plan.img.url} alt={plan.desc} title={plan.name} />
            </div>
          </div>
        </Fragment>
      )
    })
  }

  return content
}

export default Plans
