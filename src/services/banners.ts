import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import {
  TParamsCreateBanner,
  TParamsDeleteMultipleBanner,
  TParamsEditBanner,
  TParamsGetBanners
} from 'src/types/banner'

export const getAllBanners = async (data: { params: TParamsGetBanners }) => {
  try {
    const res = await axios.get(`${API_ENDPOINT.SETTING.BANNER.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createBanner = async (data: TParamsCreateBanner) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.BANNER.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateBanner = async (data: TParamsEditBanner) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.BANNER.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteBanner = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.BANNER.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsBanner = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.BANNER.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleBanner = async (data: TParamsDeleteMultipleBanner) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.BANNER.INDEX}/delete-many`, { data })
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
