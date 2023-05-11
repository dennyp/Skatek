import React, { lazy, Suspense } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './app/features/auth/Login'
import RequireAdmin from './app/features/auth/RequireAdmin'
import RequireAuth from './app/features/auth/RequireAuth'
import ErrorFallback from './components/ErrorFallback'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Skeleton from './components/Skeleton'
import StatisticsLayout from './components/StatisticsLayout'

const Products = lazy(() => import('./app/features/products/Products'))
const ActivityLogs = lazy(() =>
  import('./app/features/activitylogs/ActivityLogs')
)
const LightTraps = lazy(() => import('./app/features/lighttraps/LightTraps'))
const LightTrapLogsLayout = lazy(() =>
  import('./app/features/lighttraplogs/LightTrapLogsLayout')
)
const PlansLayout = lazy(() => import('./app/features/plans/PlansLayout'))
const DeviationsLayout = lazy(() =>
  import('./app/features/deviations/DeviationsLayout')
)
const Documents = lazy(() => import('./app/features/documents/Documents'))

const App = () => {
  const navigate = useNavigate()

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
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
          <Route path="login" element={<Login />} />
          <Route
            element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => navigate('/')}
              >
                <Suspense fallback={<Skeleton />}>
                  <RequireAuth />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route
              index
              element={
                <StatisticsLayout
                  title="Statistik"
                  paragraph="Välj tidsperiod och relevant avdelning nedan. De diagram som visas är den genomsnittliga totala aktiviteten för de betesstationer som har haft aktivitet under en vald tidperiod, det genomsnittliga antalet insekter infångade i ljusfällorna och dessutom det totala antalet insekter för repsktive ljusfälla i avdelningen."
                  showProductAverages={true}
                />
              }
            />
            <Route path="plans" element={<PlansLayout />} />
            <Route path="documents" element={<Documents />} />
            <Route path="deviations" element={<DeviationsLayout />} />
            <Route element={<RequireAdmin />}>
              <Route path="products" element={<Products />} />
              <Route path="activitylogs" element={<ActivityLogs />} />
              <Route path="lighttraps" element={<LightTraps />} />
              <Route path="lighttraplogs" element={<LightTrapLogsLayout />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App
