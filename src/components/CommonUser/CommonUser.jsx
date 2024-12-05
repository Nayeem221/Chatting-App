import React from 'react'

const CommonUser = ({commonuserphoto,username}) => {
  return (
    <>
      <div className='flex gap-5 items-center'>
     
   <div className="commonuserimg w-[50px] h-[50px] rounded-full bg-gray-500 overflow-hidden">
    <img src={commonuserphoto} alt="" />
   </div>
   <h2>{username}</h2>
      </div>
    </>
  )
}

export default CommonUser
