import {FC, useState, createContext, useContext, SetStateAction, Dispatch, useEffect} from 'react'
import {WithChildren} from '../../../../_metronic/helpers'
import {getItem, removeItem, setItem} from '../../../utils/localstorage'
import {tokenKey} from '../../../services/SERVICE-CONSTANTS'
import {IUser} from '../../../interfaces'
import {useNavigate} from 'react-router-dom'
import { apiCaller } from '../../../hooks/useApi'
import { ServiceAgent } from '../../../services/serviceAgent'
import { useLoadingContext } from '../../../contexts/loading/loading'
const userInfoLsKey = 'user-info'

interface IinitAuthContextPropsState {
  jwtToken: string | undefined
  saveToken: (token: string | undefined) => void
  saveUserInfo: (info: IUser | undefined) => void
  setUserInfo: Dispatch<SetStateAction<IUser | undefined>>
  logout: () => void
  userInfo: IUser | undefined
}
const initAuthContextPropsState = {
  jwtToken: '',
  saveToken: (token: string | undefined) => {},
  saveUserInfo: (info: IUser | undefined) => {},
  setUserInfo: () => {},
  logout: () => {},
  userInfo: undefined,
}
const AuthContext = createContext<IinitAuthContextPropsState>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}
const getJSON = (key: string) => {
  if (getItem(key) && getItem(key) != 'undefined' && getItem(key) != undefined) {
    return JSON.parse(getItem(key))
  } else return undefined
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const { handleCloseLoadingOverlay, handleOpenLoadingOverlay } = useLoadingContext()
  const [jwtToken, setJwtToken] = useState<string | undefined>(getItem(tokenKey))
  const [userInfo, setUserInfo] = useState<IUser | undefined>()
  const navigate = useNavigate()
  const saveToken = (token: string | undefined) => {
    setJwtToken(token)
    if (token) {
      setItem(tokenKey, token)
    } else {
      removeItem(tokenKey)
      removeItem(userInfoLsKey)
    }
  }
  const saveUserInfo = (info: IUser | undefined) => {
    setUserInfo(info)
    setItem(userInfoLsKey, JSON.stringify(info))
  }

  const getUserProfile = () => {
    apiCaller({
      api: ServiceAgent.authentication.request_getProfile,
      onSuccess: (resp) => {
        if(resp?.status == 200 && resp?.data?.statusCode == 200) {
          setUserInfo({...resp?.data?.data})
        }
      },
      onErrorMessage: 'دریافت اطلاعات کاربر با خطا مواجهه شد',
    })
  }
  const logout = () => {
    navigate('auth')
    setTimeout(() => {
      removeItem(tokenKey)
      removeItem(userInfoLsKey)
    }, 0)
  }

  useEffect(() => {
   if(jwtToken) {
    getUserProfile()
   }
  }, [])

  return (
    <AuthContext.Provider value={{jwtToken, userInfo, saveUserInfo, saveToken, logout, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}
