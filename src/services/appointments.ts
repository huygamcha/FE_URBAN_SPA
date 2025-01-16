import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsGetAppointments } from 'src/types/appointments'

export const getAllAppointments = async (data: { params: TParamsGetAppointments }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.REPORT.INDEX}/appointments`, data)

    return res.data
  } catch (error) {
    return error
  }
}
