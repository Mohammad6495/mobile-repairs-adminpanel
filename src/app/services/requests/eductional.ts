import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_eductional = APIS_ENDPOINTS.eductional

export const request_getAlleductionals = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_eductional.getAllEductional +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_createeductional = async (data) => {

  return http.post(call_eductional.addEductional, data)
}

export const request_editeductional = async (data) => {

  return http.post(call_eductional.editEductional, data)
}

export const request_removeeductional = async (id: string) => {

  return http.delete(call_eductional.removeEductional + '?id=' + id)
}

