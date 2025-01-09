// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createPackageAsync,
  deleteMultiplePackageAsync,
  deletePackageAsync,
  getAllPackagesAsync,
  serviceName,
  updatePackageAsync
} from 'src/stores/package/actions'

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
  packages: {
    data: [],
    total: 0
  }
}

export const packageSlice = createSlice({
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
    builder.addCase(getAllPackagesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllPackagesAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.packages.data = action.payload?.data?.packages || []
      state.packages.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllPackagesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.packages.data = []
      state.packages.total = 0
    })

    // ** create package
    builder.addCase(createPackageAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createPackageAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update package
    builder.addCase(updatePackageAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updatePackageAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete package
    builder.addCase(deletePackageAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deletePackageAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple package
    builder.addCase(deleteMultiplePackageAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultiplePackageAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = packageSlice.actions
export default packageSlice.reducer
