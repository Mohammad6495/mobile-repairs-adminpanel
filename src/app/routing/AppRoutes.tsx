/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'

const AppRoutes: FC = () => {
  const {jwtToken} = useAuth()
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='error/*' element={<ErrorsPage />} />
        <Route path='logout' element={<Logout />} />
        <Route path='auth/*' element={<AuthPage />} />
        {jwtToken ? (
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/auth' />} />
        )}
      </Route>
    </Routes>
  )
}

export {AppRoutes}
