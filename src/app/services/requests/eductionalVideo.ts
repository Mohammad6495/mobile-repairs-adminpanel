import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'

const call_eductionalVideo = APIS_ENDPOINTS.eductionalVideo

export const request_getAlleductionalVideos = ({ search = '', pageSize, currentPage, headlineId }) => {
  return http.get(
    call_eductionalVideo.getAllEductionalVideo +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}&headlineId=${headlineId}`
  )
}

export const request_createeductionalVideo = async (data) => {

  return http.post(call_eductionalVideo.addEductionalVideo, data)
}

export const request_editeductionalVideo = async (data) => {

  return http.post(call_eductionalVideo.editEductionalVideo, data)
}

export const request_removeeductionalVideo = async (id: string) => {

  return http.delete(call_eductionalVideo.removeEductionalVideo + '?id=' + id)
}

