import { createAsyncThunk } from '@reduxjs/toolkit'
import { createPackage, deleteMultiplePackage, deletePackage, getAllPackages, updatePackage } from 'src/services/packages'

// ** services

// ** Types
import { TParamsCreatePackage, TParamsDeleteMultiplePackage, TParamsEditPackage, TParamsGetPackages } from 'src/types/package'

export const serviceName = "package"

export const getAllPackagesAsync = createAsyncThunk(`${serviceName}/get-all`, async (data: { params: TParamsGetPackages }) => {
  const response = await getAllPackages(data)

  return response
})

export const createPackageAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreatePackage) => {
  const response = await createPackage(data)

  return response
})

export const updatePackageAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditPackage) => {
  const response = await updatePackage(data)

  return response
})

export const deletePackageAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deletePackage(id)

  return response
})

export const deleteMultiplePackageAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data: TParamsDeleteMultiplePackage) => {
  const response = await deleteMultiplePackage(data)

  return response
})
