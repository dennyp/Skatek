import React from 'react'

import { Button, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ActivityLog from './app/features/activitylogs/ActivityLog'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Products from './components/product/Products'

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
        <Route path="/products" element={<Products />} />
        <Route path="/logactivity" element={<ActivityLog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Button onClick={signOut}>Logga ut</Button>
    </>
  )
}

export default withAuthenticator(App)
