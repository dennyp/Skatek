import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth)

  if (!Object.keys(userInfo).length === 0) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
