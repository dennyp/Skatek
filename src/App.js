/* src/App.js */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import Dashboard from './components/Dashboard.js'

// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react'

const App = ({ signOut, user }) => {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
