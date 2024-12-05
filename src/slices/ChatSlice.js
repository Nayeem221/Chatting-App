import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice(
    {

  name: 'chatuser',
  initialState: {
    value:JSON.parse(localStorage.getItem('data'))?JSON.parse(localStorage.getItem('data')):null
  },
  reducers: {
    
    
    chatData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { chatData } =ChatSlice.actions

export default ChatSlice.reducer