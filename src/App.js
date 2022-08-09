import React from 'react'

import { Button, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Route, Routes } from 'react-router-dom'
import ActivityLog from './app/features/activitylogs/ActivityLog.js'
import Dashboard from './components/Dashboard.js'
import Navigation from './components/Navigation.js'
import NotFound from './components/NotFound.js'
import Products from './components/product/Products.js'

const App = ({ signOut, user }) => {
  return (
    <>
      <Navigation />
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
