// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import auth from 'src/stores/auth'
import role from 'src/stores/role'
import user from 'src/stores/user'
import city from 'src/stores/city'
import deliveryType from 'src/stores/delivery-type'
import paymentType from 'src/stores/payment-type'
import productType from 'src/stores/product-type'
import product from 'src/stores/product'
import orderProduct from 'src/stores/order-product'
import reviews from 'src/stores/reviews'
import comments from 'src/stores/comments'
import notification from 'src/stores/notification'

// spa
import packages from 'src/stores/package'
import orderSpa from 'src/stores/order-spa'
import services from 'src/stores/service'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    deliveryType,
    paymentType,
    productType,
    product,
    reviews,
    comments,
    notification,
    orderProduct,

    // spa
    packages,
    orderSpa,
    services
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
