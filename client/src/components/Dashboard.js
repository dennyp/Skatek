import { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { utils, writeFileXLSX } from 'xlsx'
// import { fetchActivityLogs } from '../app/features/activitylogs/activitylogSlice'

const Dashboard = () => {
  const dispatch = useDispatch()

  // const handleDownloadExcelClick = useCallback(async () => {
  //   try {
  //     const fetchActivityLogData = async () => {
  //       const logs = await dispatch(fetchActivityLogs()).unwrap()

  //       const flattenedLogs = logs.map((log) => ({
  //         activityLogId: log.id,
  //         departmentId: log.product.department.id,
  //         departmentName: log.product.department.name,
  //         productId: log.product.id,
  //         productName: log.product.name,
  //         productPlacement: log.product.placement,
  //         productTypeId: log.product.productType.id,
  //         productTypeName: log.product.productType.name,
  //         activity: log.activity,
  //         comment: log.comment,
  //         dateLogged: log.dateLogged.slice(0, 10),
  //       }))

  //       return flattenedLogs
  //     }

  //     const calculateLogStatistics = (logs) => {
  //       const result = logs.reduce(
  //         (acc, current) => ({
  //           ...acc,
  //           [current.productId]: {
  //             productId: current.productId,
  //             productName: current.productName,
  //             departmentName: current.departmentName,
  //             activity:
  //               current.activity +
  //               (acc[current.productId] ? acc[current.productId].activity : 0),
  //             numberOfLogs: acc[current.productId]
  //               ? acc[current.productId].numberOfLogs + 1
  //               : 1,
  //             averageActivity: acc[current.productId]
  //               ? (current.activity + acc[current.productId].activity) /
  //                 (acc[current.productId].numberOfLogs + 1)
  //               : 0,
  //           },
  //         }),
  //         {}
  //       )

  //       return Object.values(result)
  //     }

  //     const logs = await fetchActivityLogData()
  //     const logStatistics = calculateLogStatistics(logs)
  //     const ws1 = utils.json_to_sheet(logs)
  //     const ws2 = utils.json_to_sheet(logStatistics)
  //     const wb = utils.book_new()
  //     utils.book_append_sheet(wb, ws1, 'Data')
  //     utils.book_append_sheet(wb, ws2, 'Statistik')
  //     writeFileXLSX(wb, 'Sammanställning aktivitet.xlsx')
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }, [dispatch])

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Kontrollpanel</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5">
                {/* <Button onClick={handleDownloadExcelClick}> */}
                Exportera excel
                {/* </Button> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
