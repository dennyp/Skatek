import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from '../../../components/Pagination'
import ActivityLogRow from './ActivityLogRow'
import { getLogsError, selectAllLogs } from './activitylogSlice'
import ActivityLogSlideover from './ActivityLogSlideover'

const ActivityLogTable = ({ logsStatus, department }) => {
  const [openEditLogSlider, setOpenEditLogSlider] = useState(false)
  const [selectedLogId, setSelectedLogId] = useState('')

  const logs = useSelector(selectAllLogs)
  const error = useSelector(getLogsError)

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
        tableBody = logs.map((log) => (
          <ActivityLogRow
            key={log.id}
            log={log}
            showEditSlideover={setOpenEditLogSlider}
            setSelectedLogId={setSelectedLogId}
          />
        ))
      }
      break
  }

  return (
    <>
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
        <tbody className="divide-y divide-gray-200 bg-white">{tableBody}</tbody>
      </table>
      {openEditLogSlider && (
        <ActivityLogSlideover
          open={openEditLogSlider}
          setOpen={setOpenEditLogSlider}
          id={selectedLogId}
        />
      )}
      <Pagination />
    </>
  )
}

export default ActivityLogTable
