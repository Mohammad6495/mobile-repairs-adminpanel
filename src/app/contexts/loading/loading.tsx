import React, {useState, useEffect} from 'react'
import './loading.styles.css'
//////////////////////////////////////
interface ILoadingValues {
  showLoading: boolean
  handleOpenLoadingOverlay: () => void
  handleCloseLoadingOverlay: () => void
}
const LoadingInitialValues: ILoadingValues = {
  showLoading: false,
  handleOpenLoadingOverlay: () => {},
  handleCloseLoadingOverlay: () => {},
}
const LoadingContext = React.createContext(LoadingInitialValues)
//
const LoadingContextProvider = ({children}: {children: React.ReactNode}) => {
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const handleOpenLoadingOverlay = () => {
    setShowLoading(true)
  }
  const handleCloseLoadingOverlay = () => {
    setShowLoading(false)
  }
  // RENDER
  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        handleOpenLoadingOverlay,
        handleCloseLoadingOverlay,
      }}
    >
      {children}
      {showLoading && (
        <div className='lds-ripple-container d-flex flex-row justify-content-center align-items-center'>
          <div className='lds-ripple'>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider
export const useLoadingContext = () => React.useContext(LoadingContext)
