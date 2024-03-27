import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_category = APIS_ENDPOINTS.category

export const request_getAllcategorys = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_category.getAllCategory +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_createCategory = async (data) => {

  return http.post(call_category.addCategory, data)
}

export const request_editCategory = async (data) => {

  return http.post(call_category.editCategory, data)
}

export const request_removeCategory = async (id: string) => {

  return http.delete(call_category.removeCategory + '?id=' + id)
}

