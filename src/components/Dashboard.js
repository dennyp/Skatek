import { Fragment } from 'react'
import Statistics from './Statistics.js'

const Dashboard = () => {
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
                <Statistics />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
