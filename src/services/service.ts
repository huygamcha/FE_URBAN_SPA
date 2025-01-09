import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateService, TParamsDeleteMultipleService, TParamsEditService, TParamsGetServices } from 'src/types/service'

export const getAllServices = async (data: { params: TParamsGetServices }) => {
  try {
    const res = await axios.get(`${API_ENDPOINT.SETTING.SERVICE.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createService = async (data: TParamsCreateService) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.SERVICE.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateService = async (data: TParamsEditService) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.SERVICE.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteService = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.SERVICE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsService = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.SERVICE.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleService = async (data: TParamsDeleteMultipleService) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.SERVICE.INDEX}/delete-many`, { data })
    if (res?.data?.status === 'Success') {
      return {
        data: []
      }
    }

    return {
      data: null
    }
  } catch (error: any) {
    return error?.response?.data
  }
}
