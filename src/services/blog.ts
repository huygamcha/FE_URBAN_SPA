import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateBlog, TParamsDeleteMultipleBlog, TParamsEditBlog, TParamsGetBlogs } from 'src/types/blog'

export const getAllBlogs = async (data: { params: TParamsGetBlogs }) => {
  try {
    const res = await axios.get(`${API_ENDPOINT.SETTING.BLOG.INDEX}`, data)

    return res.data
  } catch (error) {
    return error
  }
}

export const createBlog = async (data: TParamsCreateBlog) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.BLOG.INDEX}`, data)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateBlog = async (data: TParamsEditBlog) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTING.BLOG.INDEX}/${id}`, rests)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteBlog = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.BLOG.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsBlog = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.BLOG.INDEX}/${id}`)

    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleBlog = async (data: TParamsDeleteMultipleBlog) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTING.BLOG.INDEX}/delete-many`, { data })
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
