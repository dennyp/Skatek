import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import React, { useState } from 'react'
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
                  <div className="columns-2">
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
                  {departments.map((department) => (
                    <>
                      <BarChart
                        key={department._id}
                        department={department}
                        dateStart={moment(dateStart).format('YYYY-MM-DD')}
                        dateEnd={moment(dateEnd).format('YYYY-MM-DD')}
                      />
                    </>
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
