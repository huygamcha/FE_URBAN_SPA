// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  createBannerAsync,
  deleteMultipleBannerAsync,
  deleteBannerAsync,
  getAllBannersAsync,
  serviceName,
  updateBannerAsync
} from 'src/stores/banner/actions'

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
  banners: {
    data: [],
    total: 0
  }
}

export const bannerSlice = createSlice({
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
    builder.addCase(getAllBannersAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllBannersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.banners.data = action.payload?.data?.banners || []
      state.banners.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllBannersAsync.rejected, (state, action) => {
      state.isLoading = false
      state.banners.data = []
      state.banners.total = 0
    })

    // ** create banner
    builder.addCase(createBannerAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createBannerAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.length
      state.isErrorCreateEdit = !action.payload?.data?.length
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** update banner
    builder.addCase(updateBannerAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateBannerAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageErrorCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete banner
    builder.addCase(deleteBannerAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteBannerAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple banner
    builder.addCase(deleteMultipleBannerAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleBannerAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = bannerSlice.actions
export default bannerSlice.reducer
