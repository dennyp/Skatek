import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivityLogs from './app/features/activitylogs/ActivityLogs'
import Login from './app/features/auth/Login'
import RequireAdmin from './app/features/auth/RequireAdmin'
import RequireAuth from './app/features/auth/RequireAuth'
import DeviationsLayout from './app/features/deviations/DeviationsLayout'
import Documents from './app/features/documents/Documents'
import LightTrapLogsLayout from './app/features/lighttraplogs/LightTrapLogsLayout'
import LightTraps from './app/features/lighttraps/LightTraps'
import PlansLayout from './app/features/plans/PlansLayout'
import Products from './app/features/products/Products'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import StatisticsLayout from './components/StatisticsLayout'

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Navigation />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route
              index
              element={
                <StatisticsLayout
                  title="Statistik"
                  paragraph="Välj tidsperiod och relevant avdelning nedan. De diagram som visas är den genomsnittliga totala aktiviteten för de betesstationer som har haft aktivitet under en vald tidperiod, det genomsnittliga antalet insekter infångade i ljusfällorna och dessutom det totala antalet insekter för repsktive ljusfälla i avdelningen."
                  showProductAverages={true}
                />
              }
            />
            <Route path="plans" element={<PlansLayout />} />
            <Route path="documents" element={<Documents />} />
            <Route path="deviations" element={<DeviationsLayout />} />
            <Route element={<RequireAdmin />}>
              <Route path="products" element={<Products />} />
              <Route path="activitylogs" element={<ActivityLogs />} />
              <Route path="lighttraps" element={<LightTraps />} />
              <Route path="lighttraplogs" element={<LightTrapLogsLayout />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App
