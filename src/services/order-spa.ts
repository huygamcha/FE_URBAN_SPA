// ** Cars

// api endPoint
import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'

// Axios
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateOrderSpa, TParamsEditOrderSpa, TParamsGetOrderSpas, TParamsStatusOrderUpdate } from 'src/types/order-spa'

export const getAllOrderSpasByMe = async (data: { params: TParamsGetOrderSpas }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.APPOINTMENT.INDEX}/me`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createOrderSpa = async (data: TParamsCreateOrderSpa) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.APPOINTMENT.INDEX}`, data)
    // const res = await instanceAxios.post(`${API_ENDPOINT.APPOINTMENT.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateStatusOrderSpa = async (data: TParamsStatusOrderUpdate) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.APPOINTMENT.INDEX}/status/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsOrderSpaByMe = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.APPOINTMENT.INDEX}/me/${id}`)

    return res.data
  } catch (error) {
    return error
  }
}

export const cancelOrderSpaOfMe = async (id: string) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.APPOINTMENT.INDEX}/me/cancel/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

// admin cms
export const deleteOrderSpa = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.APPOINTMENT.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsOrderSpa = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.APPOINTMENT.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getAllOrderSpas = async (data: { params: TParamsGetOrderSpas }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.APPOINTMENT.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const updateOrderSpa = async (data: TParamsEditOrderSpa) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.APPOINTMENT.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}
