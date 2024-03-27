import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_teacher = APIS_ENDPOINTS.teacher

export const request_getAllteachers = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_teacher.getAllTeacher +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_createteacher = async (data) => {

  return http.post(call_teacher.addTeacher, data)
}

export const request_editteacher = async (data) => {

  return http.post(call_teacher.editTeacher, data)
}

export const request_removeteacher = async (id: string) => {

  return http.delete(call_teacher.removeTeacher + '?id=' + id)
}

