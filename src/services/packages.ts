import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreatePackage, TParamsDeleteMultiplePackage, TParamsEditPackage, TParamsGetPackages } from 'src/types/package'

export const getAllPackages = async (data: { params: TParamsGetPackages }) => {
  try {
    const res = await axios.get(`${API_ENDPOINT.SETTING.CITY.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createPackage = async (data: TParamsCreatePackage) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.CITY.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updatePackage = async (data: TParamsEditPackage) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.CITY.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deletePackage = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.CITY.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsPackage = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.CITY.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultiplePackage = async (data: TParamsDeleteMultiplePackage) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.CITY.INDEX}/delete-many`, { data })
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
