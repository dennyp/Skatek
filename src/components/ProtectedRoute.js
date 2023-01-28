import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, children }) => {
  const admin =
    user.signInUserSession.accessToken.payload['cognito:groups'][0] === 'admin'

  if (!admin) {
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute
