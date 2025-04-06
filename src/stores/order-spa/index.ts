// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import {
  cancelOrderSpaOfMeAsync,
  createOrderSpaAsync,
  deleteMultipleOrderSpaAsync,
  deleteOrderSpaAsync,
  getAllOrderSpasAsync,
  getAllOrderSpasByMeAsync,
  serviceName,
  updateOrderSpaAsync,
  updateStatusOrderSpaAsync
} from './actions'

// ** Actions

const initialState = {
  isSuccessCreate: false,
  isErrorCreate: false,
  messageErrorCreate: '',
  isSuccessCancelMe: false,
  isErrorCancelMe: false,
  messageErrorCancelMe: '',
  isSuccessEdit: false,
  isErrorEdit: false,
  messageErrorEdit: '',
  isSuccessUpdateStatus: false,
  isErrorUpdateStatus: false,
  messageErrorUpdateStatus: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isLoading: false,
  typeError: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  orderSpa: {
    name: ''
  },
  orderSpas: {
    data: [],
    total: 0
  }
}

export const orderSpaSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateCarToCart: (state, action) => {
      // state.orderItems = action.payload.orderItems
    },
    resetInitialState: state => {
      state.isSuccessCreate = false
      state.isErrorCreate = true
      state.messageErrorCreate = ''
      state.typeError = ''
      state.isLoading = false
      state.isSuccessCancelMe = false
      state.isErrorCancelMe = true
      state.messageErrorCancelMe = ''
      state.isSuccessEdit = false
      state.isErrorEdit = true
      state.messageErrorEdit = ''
      state.isSuccessUpdateStatus = false
      state.isErrorUpdateStatus = true
      state.messageErrorUpdateStatus = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageErrorMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // ** get all order cars by me
    // builder.addCase(getAllOrderSpasByMeAsync.pending, (state, action) => {
    //   state.isLoading = true
    // })
    // builder.addCase(getAllOrderSpasByMeAsync.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.ordersOfMe.data = action.payload?.data?.orders || []
    //   state.ordersOfMe.total = action.payload?.data?.totalCount
    // })
    // builder.addCase(getAllOrderSpasByMeAsync.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.ordersOfMe.data = []
    //   state.ordersOfMe.total = 0
    // })

    // ** create order car
    builder.addCase(createOrderSpaAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createOrderSpaAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?._id
      state.isErrorEdit = !action.payload?.data?._id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** cancel order car of me
    // builder.addCase(cancelOrderSpaOfMeAsync.pending, (state, action) => {
    //   state.isLoading = true
    // })
    // builder.addCase(cancelOrderSpaOfMeAsync.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccessCancelMe = !!action.payload?.data?._id
    //   state.isErrorCancelMe = !action.payload?.data?._id
    //   state.messageErrorCancelMe = action.payload?.message
    //   state.typeError = action.payload?.typeError
    // })

    // ** get all order cars
    builder.addCase(getAllOrderSpasAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrderSpasAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderSpas.data = action.payload?.data?.appointments || []
      state.orderSpas.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllOrderSpasAsync.rejected, (state, action) => {
      state.isLoading = false
      state.orderSpas.data = []
      state.orderSpas.total = 0
    })

    // // ** update order car
    builder.addCase(updateOrderSpaAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateOrderSpaAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessEdit = !!action.payload?.data?._id
      state.isErrorEdit = !action.payload?.data?._id
      state.messageErrorEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // // ** update status order car
    builder.addCase(updateStatusOrderSpaAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateStatusOrderSpaAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateStatus = !!action.payload?.data?._id
      state.isErrorUpdateStatus = !action.payload?.data?._id
      state.messageErrorUpdateStatus = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // // ** delete orders car
    builder.addCase(deleteOrderSpaAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrderSpaAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageErrorDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // ** delete multiple OrderSpa
    builder.addCase(deleteMultipleOrderSpaAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleOrderSpaAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageErrorMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { updateCarToCart, resetInitialState } = orderSpaSlice.actions
export default orderSpaSlice.reducer
