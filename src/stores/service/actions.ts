import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllServices } from 'src/services/service'
import { createService, deleteMultipleService, deleteService, updateService } from 'src/services/service'

// ** services

// ** Types
import { TParamsCreateService, TParamsDeleteMultipleService, TParamsEditService, TParamsGetServices } from 'src/types/service'

export const serviceName = "service"

export const getAllServicesAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetServices }) => {
  const response = await getAllServices(data)

  return response
})

export const createServiceAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateService) => {
  const response = await createService(data)

  return response
})

export const updateServiceAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditService) => {
  const response = await updateService(data)

  return response
})

export const deleteServiceAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteService(id)

  return response
})

export const deleteMultipleServiceAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data: TParamsDeleteMultipleService) => {
  const response = await deleteMultipleService(data)

  return response
})
