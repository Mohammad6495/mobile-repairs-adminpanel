import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'



// const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
// const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
// const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
//Dashboard
const Dashboard = lazy(() => import('../pages/DashBoard/DashBoard'))
///Product
const ProductAddPage = lazy(() => import('../pages/products/ProductAdd.page'))
const ProductListPage = lazy(() => import('../pages/products/ProductList.page'))
const CategoryListPage = lazy(() => import('../pages/category/CategoryList.page'))
///Users
const UsersListPage = lazy(() => import('../pages/users/UsersList.page'))
///Order
const HeadlineListPage = lazy(() => import('../pages/headline/HeadlineList.page'))


const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        
        <Route
          path='upsert-course'
          element={
            <SuspensedView>
              <ProductAddPage />
            </SuspensedView>
          }
        />
        <Route
          path='edit-course/:id'
          element={
            <SuspensedView>
              <ProductAddPage />
            </SuspensedView>
          }
        />
        <Route
          path='course-list'
          element={
            <SuspensedView>
              <ProductListPage />
            </SuspensedView>
          }
        />

      
        <Route
          path='category-list'
          element={
            <SuspensedView>
              <CategoryListPage />
            </SuspensedView>
          }
        />
        <Route
          path='headline-list/:id'
          element={
            <SuspensedView>
              <HeadlineListPage />
            </SuspensedView>
          }
        />

        
        <Route
          path='users-list'
          element={
            <SuspensedView>
              <UsersListPage />
            </SuspensedView>
          }
        />
        <Route
          path='dashboard'
          element={
            <SuspensedView>
              <Dashboard />
            </SuspensedView>
          }
        />
        {/* Lazy Modules */}

        {/* survey-statistics SurveyStatistics */}
        {/* <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        */}
        {/* Page Not Found */}
        {/* <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 3,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
