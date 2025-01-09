// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createServiceAsync,
  deleteMultipleServiceAsync,
  deleteServiceAsync,
  getAllServicesAsync,
  serviceName,
  updateServiceAsync
} from 'src/stores/service/actions'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageErrorCreateEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  services: {
    data: [],
    total: 0
  }
}

export const serviceSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageErrorMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // ** get all cites
    builder.addCase(getAllServicesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllServicesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.services.data = action.payload?.data?.services || []
      state.services.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllServicesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.services.data = []
      state.services.total = 0
    })

    // ** create service
    builder.addCase(createServiceAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createServiceAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update service
    builder.addCase(updateServiceAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateServiceAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete service
    builder.addCase(deleteServiceAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteServiceAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple service
    builder.addCase(deleteMultipleServiceAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleServiceAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = serviceSlice.actions
export default serviceSlice.reducer
