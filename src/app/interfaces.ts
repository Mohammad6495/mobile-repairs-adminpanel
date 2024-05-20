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

export interface IHeadline {
  id?: string | number
  title?: string
  description?: string
  isAvailable?: boolean,
  updatedAt?: string
  ceatedAt?: string
  eductionals?:IEductional[]
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
  finalPrice?: number
  course?: ICourse[]
  licenceKey?: string
  isPay?: boolean
  user?: IUser
  updatedAt?: string
  createdAt?: string
}


export interface ICourse {
  id?: string,
  title?: string,
  description?: string,
  price?: number,
  image?: string,
  viewCount?: number,
  courseLevel?: number,
  courseStatus?: number,
  teacher?: string,
  isFree?: boolean;
  video?:string,
  category?: ICategory,
  isAvailable: boolean,
  updatedAt?: string
  createdAt?: string
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
  title: string
  isActive?: boolean,
  isAvailable?: boolean,
  isPayActive?:boolean,
  videoTime?: Date,
  headLine?:IHeadline 
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

