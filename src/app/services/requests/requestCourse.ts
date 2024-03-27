import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_requestCourse = APIS_ENDPOINTS.requestCourse

export const request_getAllrequestCourses = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_requestCourse.getAllRequestCourse +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_createrequestCourse = async (data) => {

  return http.post(call_requestCourse.addRequestCourse, data)
}

export const request_editrequestCourse = async (data) => {

  return http.post(call_requestCourse.editRequestCourse, data)
}

export const request_removerequestCourse = async (id: string) => {

  return http.delete(call_requestCourse.removeRequestCourse + '?id=' + id)
}

