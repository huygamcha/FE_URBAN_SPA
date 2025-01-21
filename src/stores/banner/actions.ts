import { createAsyncThunk } from '@reduxjs/toolkit'
import { createBanner, deleteBanner, deleteMultipleBanner, getAllBanners, updateBanner } from 'src/services/banners'

// ** services

// ** Types
import { TParamsCreateBanner, TParamsDeleteMultipleBanner, TParamsEditBanner, TParamsGetBanners } from 'src/types/banner'

export const serviceName = "banner"

export const getAllBannersAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetBanners }) => {
  const response = await getAllBanners(data)

  return response
})

export const createBannerAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateBanner) => {
  const response = await createBanner(data)

  return response
})

export const updateBannerAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditBanner) => {
  const response = await updateBanner(data)

  return response
})

export const deleteBannerAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteBanner(id)

  return response
})

export const deleteMultipleBannerAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data: TParamsDeleteMultipleBanner) => {
  const response = await deleteMultipleBanner(data)

  return response
})
