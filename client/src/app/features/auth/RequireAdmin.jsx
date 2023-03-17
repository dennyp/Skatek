import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAdmin = () => {
  const isAdmin = useSelector((state) => state.auth.userInfo?.user?.isAdmin)
  const location = useLocation()

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAdmin
