
export interface ILoginPayload {
  username: string
  password: string
}
//////////*********** SURVEY : START ***********//////////
////////////// CREATE SURVEY QUESTION
export interface ICreateQuestionOption {
  title: string
}
export interface ICreateQuestion {
  title: string
  tip: string
  questionType: number
  options: ICreateQuestionOption[]
  surveyId: number
}
////////////// EDIT QUESTION
export interface IEditQuestion {
  id: string | number
  title: string
  tip?: string
}

//////////////  CREATE SERVEY
export interface ICreateSurvey {
  title: string
  describtion?: string
}
//////////////  GET SERVEY DETAIL
export interface IGetSurveyDetail {
  id: string | number
}
//////////////  EDIT SERVEY
export interface IEditSurvey {
  id: string | number
  title: string
  describtion?: string
}
//////////////  DELETE SERVEY
export interface IDeleteSurvey {
  id: string | number
}
//////////*********** SURVEY : END ***********//////////
//////////*********** OWNER : START ***********//////////
//////////*********** OWNER : END ***********//////////
export interface ICreatePropertyOwner {
  ownerId: number | string
  propertyId: number | string
  unitId?: number | string
  contractSigningDate: number | string
  satisfactionLevel: 0 | 1 | 2 | 3 | 4
  description: string
  hasDesireToIntroduce: boolean
  hasIntroductionLeadsToPurchase: boolean
  disSatisfactionLevelReason?: string
}

//////////*********** Group ***********//////////
export interface ICreateGroup {
  title: string
}
export interface IEditGroup {
  id: string | number
  title: string
}
export interface IAddMember {
  GroupId: string | number
  OwnerId: string | number
}

export interface IAddToCardBoard {
  requestId?: number,
  receiverId?:number,
  receiverRole?:string,
  title?:string,
  file?:string[],
  type?:number,
  status?:number
}

export interface IPayloadProduct {
  id?:string
  title?:string,
  image?:string,
  isAvailable?:boolean,
  code?:number,
  price?:number,
  quantity?:number,
  description?:string,
  category?:string
}

export interface ICourseService {
  id?: string,
  title?: string,
  periodTime?: string,
  dayHolding?: string,
  timeHolding?: string,
  description?: string,
  courseConditions?: string,
  price?: number,
  image?:string
  teacher?: string[] | any,
  category?: string,
  eductional?: string,
  headLines?: string[] |  any,
  isAvailable: boolean,
  startTime?:string
}