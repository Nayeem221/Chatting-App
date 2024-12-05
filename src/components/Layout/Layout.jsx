import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const LayOut = () => {

  // if thereis no data it will redirect to login page
  const sliceUser=useSelector((state)=>state.currentUser.value)
  const navigate=useNavigate()


  useEffect(()=>{
  if(sliceUser==null){
    navigate('/login')
    // remove data after logout
  
  }
  },[])
  return (
    <>
     <Navbar/>
      <Outlet/>
    </>
  )
}

export default LayOut
