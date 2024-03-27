export interface IUser {
  id?: number | string
  name?: string
  userName?: string
  image?: string
  firstName?: string
  phoneNumber?: string
  updatedAt?: string
  createdAt?: string
  nationalCode?: string
  isActive?: boolean
  birthDate?: string
  role?: IUserRole,
  nikname?: string
}

export interface IUserRole {
  id?: string
  name?: string
  label?: string
}

export interface ICategory {
  id?: string | number
  title?: string
  image?: string
  isAvailable?: boolean
  products?: IProducts[]
}

export interface IProducts {
  id?: string
  title?: string
  isAvailable?: boolean
  code?: number
  image?: string
  price?: number
  quantity?: number
  description?: string
  category?: ICategory
  creator?: IUser
  updatedAt?: string
  ceatedAt?: string
}

export interface IProductOrder {
  id?: string
  product?: IProducts
  quantity?: number | any
}

export enum EAnimationType {
  'AWAITING',
  'SENDING',
  'DELIVERY',
  'CANCELLATION',
  'STATISTICS',
}

export interface IUserAddress {
  id?: string
  address?: string
  lat?: string
  long: string
  isDefaultAddress?: boolean
  user?: IUser
}

export interface IOrder {
  id?: string
  code?: string
  finalPrice?: number
  products?: IProductOrder[]
  status?: string
  isOnline?: boolean
  isHome?: boolean
  user?: IUser
  userAddress?: IUserAddress,
  updatedAt?: string
}


export interface ICourse {
  id?: string,
  title?: string,
  periodTime?: string,
  dayHolding?: string,
  timeHolding?: string,
  description?: string,
  courseConditions?: string,
  price?: number,
  image?: string
  teacher?: ITeacher[],
  category?: ICategory,
  eductional?: IEductional,
  headLines?: string[],
  isAvailable: boolean,
  startTime?:string
}
export interface ITeacher {
  id?: string,
  name: string,
  workExperience?: string,
  description?: string,
  image?: string
  course?: ICourse[]
}
export interface IEductional {
  id?: string,
  name?: string,
  description?: string,
  courses?: ICourse[]
}

export interface IHeadLines {
  id?: string,
  title?: string,
  course?: ICourse
}

export interface IFamiliarService {
  id?: string,
  phoneNumber?: string,
  favoriotArea?: string
  updatedAt?: string
  createdAt?: string
}

export interface IRequestCourse {
  id?: string,
  phoneNumber?: string,
  favoriotArea?: string,
  course?: ICourse,
  updatedAt?: string
  createdAt?: string
}
