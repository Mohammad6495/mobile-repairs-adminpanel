// export const baseUrl = 'https://pardisangroup.com/api'
// export const fileBaseUrl = 'https://pardisangroup.com'
export const baseUrl = 'http://api.ga-app.ir'
export const fileBaseUrl = 'http://api.ga-app.ir/'
export const chathubUrl = 'https://api.pardisan-mc.com/chathub'
export const tokenKey = 'admin-token-learn'

export const APIS_ENDPOINTS = {
  dashboard: {
    getStatistics: '/Dashboard/Dashboard',
  },
  authentincation: {
    login: '/account/login',
    getRoles: '/account/getroles',
    getProfile: '/account/getprofile',
    getUsersByRole: '/account/getusersbyrole',
  },
  teacher: {
    getAllTeacher: '/teacher/getAll',
    addTeacher: '/teacher/create',
    editTeacher: '/teacher/edit',
    removeTeacher: '/teacher/remove',
  },
  familiarservice:{
    getAllFamiliarservice: '/familiarservice/getAll',
    addFamiliarservice: '/familiarservice/create',
    editFamiliarservice: '/familiarservice/edit',
    removeFamiliarservice: '/familiarservice/remove',
  },
  requestCourse:{
    getAllRequestCourse: '/requestCourse/getAll',
    addRequestCourse: '/requestCourse/create',
    editRequestCourse: '/requestCourse/edit',
    removeRequestCourse: '/requestCourse/remove',
  },
  eductional: {
    getAllEductional: '/eductional/getAll',
    addEductional: '/eductional/create',
    editEductional: '/eductional/edit',
    removeEductional: '/eductional/remove',
  },
  product: {
    createProduct: '/course/create',
    editProduct: '/course/edit',
    getAllCategories: '/course/getallcategory',
    getAllProducts: '/course/getAll',
    getDetail: '/course/detail',
    deleteProduct: '/course/remove',
  },
  category: {
    getAllCategory: '/category/getAll',
    addCategory: '/category/create',
    editCategory: '/category/edit',
    removeCategory: '/category/remove',
  },
  users: {
    getAllUsers: '/users/getallusers',
    gotouserapp: '/users/gotouserapp',
  },
}
