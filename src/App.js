/* src/App.js */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Dashboard from './components/Dashboard.js'

const App = ({ signOut, user }) => {
  return (
    <>
      <Dashboard />
      {/* <Heading level={1}>Hello {user.username}</Heading> */}
      <Button onClick={signOut}>Logga ut</Button>
    </>
  )
}

export default withAuthenticator(App)
