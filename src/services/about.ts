import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsEditAbout } from 'src/types/about'

export const updateAbout = async (data: TParamsEditAbout) => {
  const { id, ...rests } = data
  // try {
  const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.ABOUT.INDEX}/${id}`, rests)

  return res.data
  // } catch (error:any) {
  //   return error?.response?.data
  // }
}

export const getDetailAbout = async (id: string) => {
  // try {
  const res = await axios.get(`${API_ENDPOINT.SETTING.ABOUT.INDEX}/${id}`)

  return res.data
  // } catch (error:any) {
  //   return error?.response?.data
  // }
}
