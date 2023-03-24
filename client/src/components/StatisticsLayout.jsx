import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'
import DepartmentInputGroup from '../app/features/departments/DepartmentInputGroup'
import { useGetDepartmentsQuery } from '../app/features/departments/departmentsApiSlice'

import BarChartInsects from './BarChartInsects'
import BarChartProductAverageActivity from './BarChartProductAverageActivity'
import PieChart from './PieChart'

const StatisticsLayout = ({
  title = '',
  paragraph = '',
  showTotalAverageInsects = false,
  showAverageInsects = false,
  showProductAverages = false,
}) => {
  const [dateStart, setDateStart] = useState(moment('2022-01-01'))
  const [dateEnd, setDateEnd] = useState(moment('2022-12-31'))
  const [dateStartPeriodTwo, setDateStartPeriodTwo] = useState(
    moment('2021-01-01')
  )
  const [dateEndPeriodTwo, setDateEndPeriodTwo] = useState(moment('2021-12-31'))
  const [selectedDepartment, setSelectedDepartment] = useState({})

  // TODO: remove this and let DepartmentInputGroup handle it? Or wait for state?
  const {
    isLoading: isLoadingDepartments,
    error: errorDepartments,
    data: departments,
  } = useGetDepartmentsQuery()

  let charts, chartToDraw
  if (
    selectedDepartment !== undefined &&
    Object.keys(selectedDepartment).length > 0
  ) {
    if (showAverageInsects) {
      chartToDraw = (
        <Fragment>
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
        </Fragment>
      )
    } else if (showTotalAverageInsects) {
      chartToDraw = (
        <Fragment>
          <BarChartInsects
            department={selectedDepartment}
            dateStart={moment(dateStart).format('YYYY-MM-DD')}
            dateEnd={moment(dateEnd).format('YYYY-MM-DD')}
            dateStartTwo={moment(dateStartPeriodTwo).format('YYYY-MM-DD')}
            dateEndTwo={moment(dateEndPeriodTwo).format('YYYY-MM-DD')}
          />
        </Fragment>
      )
    } else if (showProductAverages) {
      chartToDraw = (
        <Fragment>
          <BarChartProductAverageActivity
            department={selectedDepartment}
            dateStart={moment(dateStart).format('YYYY-MM-DD')}
            dateEnd={moment(dateEnd).format('YYYY-MM-DD')}
            dateStartTwo={moment(dateStartPeriodTwo).format('YYYY-MM-DD')}
            dateEndTwo={moment(dateEndPeriodTwo).format('YYYY-MM-DD')}
          />
        </Fragment>
      )
    }

    charts = (
      <Fragment key={selectedDepartment._id}>
        <div className="flex">
          <div className="w-full">
            <div className={showAverageInsects ? 'columns-2' : ''}>
              {chartToDraw}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

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

  const handleDepartmentChange = (newValue) => {
    setSelectedDepartment(newValue)
    charts = ''
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
                    {title}
                  </h2>
                  <p className="mb-8 text-sm">{paragraph}</p>
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
                  {charts}
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

export default StatisticsLayout
