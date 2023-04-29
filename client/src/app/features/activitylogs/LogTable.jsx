import { useEffect, useState } from 'react'

const LogTable = ({ products, setFormContent, date }) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData(
      products.map((item) => ({
        product: item._id,
        name: item.name,
        placement: item.placement,
        dateLogged: date,
        department: item.department,
        activity: 0,
        comment: '',
      }))
    )
  }, [date, products])

  useEffect(() => {
    setFormContent(tableData)
  }, [setFormContent, tableData])

  const handleActivityChange = (index, value) => {
    if (value >= 0 && value <= 100) {
      const updatedData = [...tableData]
      updatedData[index].activity = parseInt(value)
      setTableData(updatedData)
      setFormContent(updatedData)
    }
  }

  const handleCommentChange = (index, value) => {
    const updatedData = [...tableData]
    updatedData[index].comment = value
    setTableData(updatedData)
    setFormContent(updatedData)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Namn
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Aktivitet
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Kommentar
                  </th>
                  <th
                    scope="col"
                    className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Ändra</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tableData.map((item, index) => (
                  <tr key={item.product}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {`${item.name} - ${item.placement}`}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        inputMode="numeric"
                        className="block w-full border-none px-5 py-1 rounded-md bg-slate-50 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        value={item.activity}
                        onChange={(e) =>
                          handleActivityChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                      <input
                        type="text"
                        className="block w-full px-5 py-1 border-none bg-slate-50 rounded-md p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        value={item.comment}
                        onChange={(e) =>
                          handleCommentChange(index, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogTable
