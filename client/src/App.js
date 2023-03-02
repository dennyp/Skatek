import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivityLogs from './app/features/activitylogs/ActivityLogs'
import Login from './app/features/auth/Login'
import RequireAuth from './app/features/auth/RequireAuth'
import LightTraps from './app/features/lighttraps/LightTraps'
import Products from './app/features/products/Products'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'

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
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="activitylogs" element={<ActivityLogs />} />
            <Route path="lighttraps" element={<LightTraps />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App
