import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivityLog from './app/features/activitylogs/ActivityLog'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Products from './components/product/Products'
import ProtectedRoute from './components/ProtectedRoute'

const App = ({ signOut, user }) => {
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
        <Route
          path="/products"
          element={
            <ProtectedRoute user={user}>
              <Products />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="/logactivity"
          element={
            <ProtectedRoute user={user}>
              <ActivityLog />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Button onClick={signOut}>Logga ut</Button> */}
    </>
  )
}

export default App
