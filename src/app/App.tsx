import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import LoadingContextProvider from './contexts/loading/loading'
import 'react-toastify/dist/ReactToastify.css'
// Import Swiper styles

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ToastContainer
        rtl={true}
        style={{
          zIndex: '1000000000',
          width: '48%',
          fontFamily: 'iransans',
          top: '0',
        }}
        className='font-iransans text-nowrap p-0'
        position='top-center'
        hideProgressBar={true}
      />
      <I18nProvider>
        <LayoutProvider>
          <LoadingContextProvider>
            <Outlet />
          </LoadingContextProvider>
          <MasterInit />
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
