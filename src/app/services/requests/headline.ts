import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_headline = APIS_ENDPOINTS.headline

export const request_getAllheadlines = ({ search = '', pageSize, currentPage, courseId }) => {
  return http.get(
    call_headline.getAllheadline +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}&courseId=${courseId}`
  )
}

export const request_createheadline = async (data) => {

  return http.post(call_headline.addheadline, data)
}

export const request_editheadline = async (data) => {

  return http.post(call_headline.editheadline, data)
}

export const request_removeheadline = async (id: string) => {

  return http.delete(call_headline.removeheadline + '?id=' + id)
}

