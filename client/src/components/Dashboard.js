import React, { useState } from 'react'
// import { utils, writeFileXLSX } from 'xlsx'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import { useGetDepartmentsQuery } from '../app/features/departments/departmentsApiSlice'
import BarChart from './BarChart'

const Dashboard = () => {
  const [dateStart, setDateStart] = useState(moment('2022-01-01'))
  const [dateEnd, setDateEnd] = useState(moment('2023-01-01'))

  const {
    isLoading: isLoadingDepartments,
    error: errorDepartments,
    data: departments,
  } = useGetDepartmentsQuery()

  const handleDateStartChange = (newValue) => {
    setDateStart(newValue)
  }
  const handleDateEndChange = (newValue) => {
    setDateEnd(newValue)
  }

  const onKeyDown = (event) => {
    event.preventDefault()
  }

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

  let content
  if (isLoadingDepartments) {
    content = <p>Laddar...</p>
  } else {
    content = (
      <>
        <div className="min-h-full">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Kontrollpanel
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="h-auto p-5">
                  <div className="columns-2 pb-5">
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Från"
                        inputFormat="YYYY-MM-DD"
                        value={dateStart}
                        onChange={handleDateStartChange}
                        disableFuture={true}
                        minDate={moment('2021-01-01')}
                        maxDate={moment('2024-12-31')}
                        renderInput={(params) => (
                          <TextField {...params} onKeyDown={onKeyDown} />
                        )}
                      />
                    </Stack>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Till"
                        inputFormat="YYYY-MM-DD"
                        value={dateEnd}
                        onChange={handleDateEndChange}
                        disableFuture={true}
                        minDate={moment('2021-01-01')}
                        maxDate={moment('2024-12-31')}
                        renderInput={(params) => (
                          <TextField {...params} onKeyDown={onKeyDown} />
                        )}
                      />
                    </Stack>
                  </div>
                  {/* <Button onClick={handleDownloadExcelClick}> */}
                  {/* Exportera excel */}
                  {/* </Button> */}
                  {departments.map((department) => (
                    <BarChart
                      key={department._id}
                      department={department}
                      dateStart={moment(dateStart).format('YYYY-MM-DD')}
                      dateEnd={moment(dateEnd).format('YYYY-MM-DD')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  }

  return content
}

export default Dashboard
