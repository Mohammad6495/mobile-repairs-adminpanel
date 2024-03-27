import http from '../HttpConfig'
import { APIS_ENDPOINTS } from '../SERVICE-CONSTANTS'
import { ICourseService } from '../SERVICE-INTERFACES'

const call_product = APIS_ENDPOINTS.product

export const request_createProduct = async ({
  category,
  description,
  image,
  isAvailable,
  price,
  title,
  id,
  courseConditions,
  dayHolding,
  eductional,
  headLines,
  periodTime,
  teacher,
  timeHolding,
  startTime
}: ICourseService) => {
  const formData = new FormData()
  if (id) {
    formData.append('id', id as any)
  }
  formData.append('image', image as any)
  formData.append('category', category as any)
  formData.append('description', description as any)
  formData.append('isAvailable', isAvailable as any)
  formData.append('startTime', startTime as any)
  formData.append('price', price as any)
  formData.append('title', title as any)
  formData.append('courseConditions', courseConditions as any)
  formData.append('dayHolding', dayHolding as any)
  formData.append('eductional', eductional as any)
  formData.append('periodTime', periodTime as any)
  formData.append('teacher', teacher as any)
  formData.append('timeHolding', timeHolding as any)
  if (headLines?.length !== 0) {
    for (let i = 0; i < headLines.length; i++) {
      formData.append('headLines', headLines[i] as any)
    }
  }
  return http.post(call_product.createProduct, formData)
}
export const request_editProduct = async ({
  category,
  description,
  image,
  isAvailable,
  price,
  title,
  id,
  courseConditions,
  dayHolding,
  eductional,
  headLines,
  periodTime,
  teacher,
  timeHolding,
  startTime
}: ICourseService) => {
  const formData = new FormData()
  if (id) {
    formData.append('id', id as any)
  }
  if(image) {
    formData.append('image', image as any)
  }
  formData.append('category', category as any)
  formData.append('description', description as any)
  formData.append('isAvailable', isAvailable as any)
  formData.append('price', price as any)
  formData.append('startTime', startTime as any)
  formData.append('title', title as any)
  formData.append('courseConditions', courseConditions as any)
  formData.append('dayHolding', dayHolding as any)
  formData.append('eductional', eductional as any)
  formData.append('periodTime', periodTime as any)
  if (teacher?.length !== 0) {
    for (let i = 0; i < teacher?.length; i++) {
      formData.append('teacher', teacher[i] as any)
    }
  }
  formData.append('timeHolding', timeHolding as any)
  if (headLines?.length !== 0) {
    for (let i = 0; i < headLines.length; i++) {
      formData.append('headLines', headLines[i] as any)
    }
  }
  return http.post(call_product.editProduct, formData)
}

export const request_getAllCategory = () => {
  return http.get(call_product.getAllCategories)
}

export const request_getAllProducts = ({ search = '', pageSize, currentPage }) => {
  return http.get(
    call_product.getAllProducts +
    `?search=${search}&pageSize=${pageSize}&currentPage=${currentPage}`
  )
}

export const request_getDetailProducts = (id: string) => {
  return http.get(call_product.getDetail + `?id=${id}`)
}

export const request_deleteProducts = (id: string) => {
  return http.delete(call_product.deleteProduct + `?id=${id}`)
}
