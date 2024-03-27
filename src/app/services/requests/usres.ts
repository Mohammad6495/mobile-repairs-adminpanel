import http from '../HttpConfig'
import {APIS_ENDPOINTS} from '../SERVICE-CONSTANTS'

const call_Users = APIS_ENDPOINTS.users

export const request_getAllUsers = ({search = '', pageSize, currentPage}) => {
  return http.get(
    call_Users.getAllUsers + `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_GoToAppUser = (userId: string) => {
  return http.post(call_Users.gotouserapp + `?userId=${userId}`)
}
