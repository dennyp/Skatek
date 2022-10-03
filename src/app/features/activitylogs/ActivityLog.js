import React, { useEffect, useState } from 'react'

import { withAuthenticator } from '@aws-amplify/ui-react'
import { useDispatch, useSelector } from 'react-redux'
import DepartmentInputGroup from '../../../components/DepartmentInputGroup'
import Pagination from '../../../components/Pagination'
import ActivityLogRow from './ActivityLogRow'
import {
  fetchActivityLogsFromDepartment,
  getLogsError,
  getLogsStatus,
  selectAllLogs,
} from './activitylogSlice'
import ActivityLogSlideover from './ActivityLogSlideover'
import AddActivityLogSlideover from './AddActivityLogSlideover'

const ActivityLog = () => {
  const [openAddLog, setOpenAddLog] = useState(false)
  const [openEditLog, setOpenEditLog] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState()

  const dispatch = useDispatch()

  const logs = useSelector(selectAllLogs)
  const logsStatus = useSelector(getLogsStatus)
  const error = useSelector(getLogsError)

  useEffect(() => {
    dispatch(fetchActivityLogsFromDepartment(selectedDepartment))
  }, [dispatch, selectedDepartment])

  let tableBody
  switch (logsStatus) {
    case 'loading':
      // TODO: show spinner
      tableBody = (
        <tr>
          <td>Laddar aktivitetsloggar...</td>
        </tr>
      )
      break
    case 'failed':
      tableBody = (
        <tr>
          <td>{error}</td>
        </tr>
      )
      break
    default:
      if (logs.length !== 0) {
        tableBody = logs.map((log) => <ActivityLogRow key={log.id} log={log} />)
      }
      break
  }

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department)
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
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
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className=" py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Märke
                </th>
                <th
                  scope="col"
                  className="hidden pl-4 pr-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Avdelning
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Datum
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Aktivitet
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Kommentar
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Ändra</span>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Radera</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableBody}
            </tbody>
          </table>
          {openAddLog && (
            <AddActivityLogSlideover
              open={openAddLog}
              setOpen={setOpenAddLog}
            />
          )}
          {openEditLog && (
            <ActivityLogSlideover open={openEditLog} setOpen={setOpenEditLog} />
          )}
          <Pagination />
        </div>
      </div>
    </>
  )
}

export default withAuthenticator(ActivityLog)
