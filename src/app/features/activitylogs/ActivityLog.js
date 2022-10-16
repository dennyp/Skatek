import React, { useEffect, useState } from 'react'

import { withAuthenticator } from '@aws-amplify/ui-react'
import { useDispatch, useSelector } from 'react-redux'
import DepartmentInputGroup from '../../../components/DepartmentInputGroup'
import {
  fetchActivityLogsFromDepartment,
  getLogsStatus,
} from './activitylogSlice'
import ActivityLogTable from './ActivityLogTable'
import AddActivityLogSlideover from './AddActivityLogSlideover'

const ActivityLog = () => {
  const [selectedDepartment, setSelectedDepartment] = useState()
  const [openAddLog, setOpenAddLog] = useState(false)

  const dispatch = useDispatch()

  const logsStatus = useSelector(getLogsStatus)

  useEffect(() => {
    dispatch(fetchActivityLogsFromDepartment(selectedDepartment))
  }, [dispatch, selectedDepartment])

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department)
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black
          ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
        >
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Aktivitetsloggar
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Här listas alla aktivitetsloggar som finns skapade.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => setOpenAddLog(true)}
              >
                Lägg till
              </button>
            </div>
          </div>
          <div>
            <p>Filter</p>
            <DepartmentInputGroup
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            />
          </div>
          <ActivityLogTable
            logsStatus={logsStatus}
            department={selectedDepartment}
          />
        </div>
      </div>
      {openAddLog && (
        <AddActivityLogSlideover open={openAddLog} setOpen={setOpenAddLog} />
      )}
    </>
  )
}

export default withAuthenticator(ActivityLog)
