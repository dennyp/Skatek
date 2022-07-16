/* src/App.js */
import React from 'react'
import { withAuthenticator, Button } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.js'
import Dashboard from './components/Dashboard.js'
import Products from './components/product/Products.js'
import ActivityLog from './components/ActivityLog.js'
import NotFound from './components/NotFound.js'

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
