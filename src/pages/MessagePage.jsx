import React from 'react'
import MessageSidebar from '../MessageSidebar/MessageSidebar'
import MessageBox from '../MessageBox/MessageBox'

const MessagePage = () => {
  return (
    <>
     <div className='flex'>
     <MessageSidebar/>
      <MessageBox/>
     </div>
    </>
  )
}

export default MessagePage