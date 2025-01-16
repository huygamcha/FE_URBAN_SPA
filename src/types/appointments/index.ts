export type TParamsGetAppointments = {
  limit?: number
  page?: number
  search?: string
  order?: string
  start?: string
  end?: string
}

export type TParamsCreateAppointment = {
  name: string
}

export type TParamsEditAppointment = {
  id: string
  name: string
}

export type TParamsDeleteAppointment = {
  id: string
}

export type TParamsDeleteMultipleAppointment = {
  appointmentIds: string[]
}
