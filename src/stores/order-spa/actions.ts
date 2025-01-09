import { createAsyncThunk } from '@reduxjs/toolkit'
import { cancelOrderSpaOfMe, createOrderSpa, deleteOrderSpa, getAllOrderSpas, getAllOrderSpasByMe, updateOrderSpa, updateStatusOrderSpa } from 'src/services/order-spa'
import { TParamsCreateOrderSpa, TParamsEditOrderSpa, TParamsGetOrderSpas, TParamsStatusOrderUpdate } from 'src/types/order-spa'

// ** Services

// ** Types

export const serviceName = 'orderSpa'

export const createOrderSpaAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamsCreateOrderSpa) => {
  const response = await createOrderSpa(data)

  return response
})

export const getAllOrderSpasByMeAsync = createAsyncThunk(
  `${serviceName}/get-all-by-me`,
  async (data: { params: TParamsGetOrderSpas }) => {
    const response = await getAllOrderSpasByMe(data)

    return response
  }
)

export const cancelOrderSpaOfMeAsync = createAsyncThunk(`${serviceName}/cancel-order-of-my`, async (id: string) => {
  const response = await cancelOrderSpaOfMe(id)

  return response
})

// cms
export const getAllOrderSpasAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetOrderSpas }) => {
    const response = await getAllOrderSpas(data)

    return response
  }
)

export const updateOrderSpaAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamsEditOrderSpa) => {
  const response = await updateOrderSpa(data)

  return response
})

export const deleteOrderSpaAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteOrderSpa(id)

  return response
})

export const updateStatusOrderSpaAsync = createAsyncThunk(
  `${serviceName}/update-status`,
  async (data: TParamsStatusOrderUpdate) => {
    const response = await updateStatusOrderSpa(data)

    return response
  }
)
