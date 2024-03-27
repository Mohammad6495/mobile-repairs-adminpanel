import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'

/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/css/MyStyle.scss'
import 'nouislider/dist/nouislider.css'
// import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/css/style.rtl.css'
import './_metronic/assets/custom.css'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider} from './app/modules/auth'
import {BrowserRouter} from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';

const container = document.getElementById('root')
const queryClient = new QueryClient()
if (container) {
  createRoot(container).render(
    <BrowserRouter>
      <MetronicI18nProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </AuthProvider>
      </MetronicI18nProvider>
    </BrowserRouter>
  )
}
