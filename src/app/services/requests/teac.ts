import http from '../HttpConfig'
import {APIS_ENDPOINTS} from '../SERVICE-CONSTANTS'

const call_Teacher = APIS_ENDPOINTS.teacher

export const request_getAllTeacher = ({search = '', pageSize, currentPage, isActive=true}) => {
  return http.get(
    call_Teacher.getAllTeacher + `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}&isActive=${isActive}`
  )
}

export const request_addTeacher = (name: string) => {
  return http.post(call_Teacher.addTeacher + name)
}

export const request_editTeacher = (data) => {
  return http.post(call_Teacher.editTeacher,data)
}

export const request_removeTeacher = (id: string) => {
  return http.post(call_Teacher.removeTeacher + '?id=' + id)
}
