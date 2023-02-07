import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivityLog from './app/features/activitylogs/ActivityLog'
// import { useGetDetailsQuery } from './app/features/api/apiSlice'
import { setCredentials } from './app/features/auth/authSlice'
import Login from './app/features/auth/Login'
import Products from './app/features/products/Products'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch()

  // const { data, isFetching } = useGetDetailsQuery('userDetails', {
  //   pollingInterval: 90000,
  // })

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setCredentials(data))
  //   }
  // }, [data, dispatch])

  return (
    <>
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logactivity"
          element={
            <ProtectedRoute>
              <ActivityLog />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
