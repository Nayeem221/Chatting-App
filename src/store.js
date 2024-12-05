import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice'
import ChatSlice  from './slices/ChatSlice'

export default configureStore({
  reducer: {
    currentUser: UserSlice,
    ChatUser:ChatSlice
  },
})