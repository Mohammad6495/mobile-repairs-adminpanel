import * as requests_authentication from './requests/authentication'
import * as requests_product from './requests/product'
import * as requests_category from './requests/category'
import * as requests_users from './requests/usres'
import * as requests_teahcer from './requests/teacher'
import * as requests_eductional from './requests/eductional'
import * as requests_familiarService from './requests/familiarService'
import * as requests_requestCourse from './requests/requestCourse'

export const ServiceAgent = {
  authentication: requests_authentication,
  course: requests_product,
  category: requests_category,
  users: requests_users,
  eductional: requests_eductional,
  teacher: requests_teahcer,
  requestCourse: requests_requestCourse,
  familiarService: requests_familiarService
}
