import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './slice/categorySlice'
import productSlice from './slice/productSlice'
import userSlice from './slice/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice
  },
})