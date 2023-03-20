import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import React, { Fragment, useState } from 'react'
import DepartmentInputGroup from '../app/features/departments/DepartmentInputGroup'
import { useGetDepartmentsQuery } from '../app/features/departments/departmentsApiSlice'
import PieChart from './PieChart'

const Dashboard = () => {
  const [dateStart, setDateStart] = useState(moment('2022-01-01'))
  const [dateEnd, setDateEnd] = useState(moment('2022-12-31'))
  const [dateStartPeriodTwo, setDateStartPeriodTwo] = useState(
    moment('2021-01-01')
  )
  const [dateEndPeriodTwo, setDateEndPeriodTwo] = useState(moment('2021-12-31'))
  const [selectedDepartment, setSelectedDepartment] = useState({})

  const {
    isLoading: isLoadingDepartments,
    error: errorDepartments,
    data: departments,
  } = useGetDepartmentsQuery()

  const handleDateStartChange = (newValue) => {
    setDateStart(newValue)
  }

  const handleDateStartPeriodTwoChange = (newValue) => {
    setDateStartPeriodTwo(newValue)
  }

  const handleDateEndChange = (newValue) => {
    setDateEnd(newValue)
  }

  const handleDateEndPeriodTwoChange = (newValue) => {
    setDateEndPeriodTwo(newValue)
  }

  const onKeyDown = (event) => {
    event.preventDefault()
  }

  let plots
  if (Object.keys(selectedDepartment).length > 0) {
    plots = (
      <Fragment key={selectedDepartment._id}>
        <div className="flex">
          <div className="w-full">
            <div className="columns-2">
              <div>
                <PieChart
                  department={selectedDepartment}
                  dateStart={moment(dateStart).format('YYYY-MM-DD')}
                  dateEnd={moment(dateEnd).format('YYYY-MM-DD')}
                />
              </div>
              <div>
                <PieChart
                  department={selectedDepartment}
                  dateStart={moment(dateStartPeriodTwo).format('YYYY-MM-DD')}
                  dateEnd={moment(dateEndPeriodTwo).format('YYYY-MM-DD')}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  const handleDepartmentChange = (newValue) => {
    setSelectedDepartment(newValue)
    plots = ''
  }

  let content
  if (isLoadingDepartments) {
    content = <p>Laddar...</p>
  } else {
    content = (
      <>
        <div className="min-h-full">
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="h-auto p-5">
                  <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                    Statistik ljusfällor
                  </h2>
                  <p className="mb-8 text-sm">
                    Visar endast ljusfällor med uppmätt aktivitet under vald
                    tidsperiod.
                  </p>
                  <div className="columns-2 mb-6">
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Period 1 - Från"
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
                        label="Period 1 - Till"
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
                  <div className="columns-2">
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Period 2 - Från"
                        inputFormat="YYYY-MM-DD"
                        value={dateStartPeriodTwo}
                        onChange={handleDateStartPeriodTwoChange}
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
                        label="Period 2 - Till"
                        inputFormat="YYYY-MM-DD"
                        value={dateEndPeriodTwo}
                        onChange={handleDateEndPeriodTwoChange}
                        disableFuture={true}
                        minDate={moment('2021-01-01')}
                        maxDate={moment('2024-12-31')}
                        renderInput={(params) => (
                          <TextField {...params} onKeyDown={onKeyDown} />
                        )}
                      />
                    </Stack>
                  </div>
                  <div className="mb-4 mt-4">
                    <DepartmentInputGroup
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                    />
                  </div>
                  {plots}
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
