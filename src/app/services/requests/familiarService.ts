import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_familiarservice = APIS_ENDPOINTS.familiarservice

export const request_getAllfamiliarservices = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_familiarservice.getAllFamiliarservice +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_createfamiliarservice = async (data) => {

  return http.post(call_familiarservice.addFamiliarservice, data)
}

export const request_editfamiliarservice = async (data) => {

  return http.post(call_familiarservice.editFamiliarservice, data)
}

export const request_removefamiliarservice = async (id: string) => {

  return http.delete(call_familiarservice.removeFamiliarservice + '?id=' + id)
}

