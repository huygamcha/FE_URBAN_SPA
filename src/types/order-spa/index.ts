export type TItemOrderSpa = {
  name: string
  phoneNumber: string
  email: string
  packageId: string
  appointmentDate: string
  note: string
  totalPrice: string
  status: string
  language: string
}

export type TItemSpaMe = {
  name: string
  phoneNumber: string
  email: string
  packageId: string
  appointmentDate: string
  note: string
  totalPrice: string
  status: string
  language: string
}

export type TParamsCreateOrderSpa = {
  name: string
  packageId?: string
  phoneNumber: string
  email: string
  appointmentDate: string
  status?: string
  note: string
  language: string
  quantity: number
  duration: string
  allServices?: TParamsAllServicesSpa[]
}

export type TParamsStatusOrderUpdate = {
  id: string
  isDelivered?: number
  isPaid?: number
  status?: string
}

export type TParamsAllServicesSpa = {
  quantity: number
  totalPrice: number
  packageId: string
  serviceId: string
  optionId: string
}

export type TParamsEditOrderSpa = {
  id: string
  name: string
  phoneNumber: number
  email: string
  packageId: string
  appointmentDate: string
  note: string
  totalPrice: string
  status: string
  language: string
  allServices?: TParamsAllServicesSpa[]
}

export type TParamsGetOrderSpas = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TItemOrderSpaMe = {
  name: string
  phoneNumber: number
  email: string
  packageId: string
  appointmentDate: number
  note: string
  totalPrice: string
  status: string
}

export type TParamsDeleteMultipleOrderSpa = {
  appointmentIds: string[]
}

export interface TItemOrderSpas extends TItemOrderSpaMe {}
