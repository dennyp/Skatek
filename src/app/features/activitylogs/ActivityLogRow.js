import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLog, selectLogById } from './activitylogSlice'

const ActivityLogRow = ({ log, showEditSlideover, setSelectedLogId }) => {
  const dispatch = useDispatch()

  const selectedLog = useSelector((state) => selectLogById(state, log.id))

  const handleEditClick = (event) => {
    showEditSlideover(true)
    setSelectedLogId(event.target.value)
  }

  const handleDeleteClick = () => {
    try {
      dispatch(deleteLog(selectedLog)).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <tr>
      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
        {log.product.name}
        <dl className="font-normal lg:hidden">
          <dt className="sr-only">Avdelning</dt>
          <dd className="mt-1 text-gray-700">{log.product.department.name}</dd>
          <dt className="sr-only sm:hidden">Email</dt>
          <dd className="mt-1 truncate text-gray-500">{log.dateLogged}</dd>
        </dl>
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {log.product.department.name}
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {log.dateLogged}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">{log.activity}</td>
      <td className="px-3 py-4 text-sm text-gray-500">{log.comment}</td>
      <td className="py-4 pl-1.5 pr-1.5 text-right text-sm font-medium sm:pr-3">
        <button
          type="button"
          className="inline-flex items-center px-1 py-1.5 text-xs font-medium rounded-full text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleEditClick}
          value={log.id}
        >
          Ändra<span className="sr-only">, {log.product.name}</span>
        </button>
      </td>
      <td className="py-4 pl-1.5 pr-1.5 text-right text-sm font-medium sm:pr-3">
        <button
          type="button"
          className="inline-flex items-center px-1 py-1.5 text-xs font-medium rounded-full text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-500"
          onClick={handleDeleteClick}
          value={log.id}
        >
          Radera
          <span className="sr-only">, {log.product.name}</span>
        </button>
      </td>
    </tr>
  )
}

export default ActivityLogRow
