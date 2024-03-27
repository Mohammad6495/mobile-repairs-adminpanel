import http from '../HttpConfig'
import {APIS_ENDPOINTS} from '../SERVICE-CONSTANTS'
import {ILoginPayload} from '../SERVICE-INTERFACES'

const auth_endpoints = APIS_ENDPOINTS.authentincation

export const request_login = async ({username, password}: ILoginPayload) => {
 const newObjectData = {
  userName: username,
  password
 }
  return http.post(auth_endpoints.login, newObjectData)
}

export const request_getRoles = async () => {
  return http.get(auth_endpoints.getRoles)
}
export const request_getProfile = async () => {
  return http.get(auth_endpoints.getProfile)
}

export const request_getUsersByRole = async (RoleName: string) => {
  return http.get(auth_endpoints.getUsersByRole + `?RoleName=${RoleName}`)
}
