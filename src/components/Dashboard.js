import { Fragment, useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listDepartments } from '../graphql/queries'
import Overview from './Overview.js'
import Statistics from './Statistics.js'
// import ActivityChart from './ActivityChart.js'
import SearchableCombobox from './SearchableCombobox.js'

const Dashboard = () => {
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')

  useEffect(() => {
    fetchDepartments()
  }, [])

  async function fetchDepartments() {
    const departmentsData = await API.graphql(graphqlOperation(listDepartments))
    const departments = departmentsData.data.listDepartments.items
    setDepartments(departments)
  }

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5">
                {/* <Overview /> */}
                {/* <Statistics /> */}
                <SearchableCombobox
                  label="Avdelning"
                  array={departments}
                  handleChange={(event) => {
                    console.log(event.target.value)
                    setSelectedDepartment(event.target.value)
                  }}
                />
                {/* <ActivityChart /> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
