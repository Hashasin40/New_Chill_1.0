import { configureStore } from '@reduxjs/toolkit'
import filmReducer from './filmSlice'
import searchReducer from './searchSlice'
import userReducer from './userSlice'
// import subscriptionReducer from './subscriptionSlice'

export const store = configureStore({
  reducer: {
    film: filmReducer,
    search: searchReducer,
    user: userReducer,
    // subscription: subscriptionReducer
  }
})

export default store