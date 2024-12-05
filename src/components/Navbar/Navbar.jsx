import React from 'react'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPersonAdd } from "react-icons/io";
import { FaUserLargeSlash } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { GiThreeFriends } from "react-icons/gi";

const Navbar = () => {
const navigate=useNavigate()

const handlelogout=()=>{
    navigate("/login")
    localStorage.removeItem('user')
}

  const  sliceuser=useSelector((state)=>state.currentUser.value)
  return (
    <>
      <nav className='p-5 flex  justify-center  items-center bg-cyan-600 gap-12 text-3xl rounded-sm shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] '>
      <Link to={'/alluser'}><FaUser className='hover:text-brandcolor'/></Link>
      <Link to={'/friends'}><GiThreeFriends className='hover:text-brandcolor'/></Link>
      <Link to={'/friendrequest'}>< IoIosPersonAdd className='hover:text-brandcolor'/></Link>
      <Link><div className='w-[50px] h-[50px] bg-gray-500 rounded-full  border-brandcolor border-[4px] overflow-hidden'><img src={sliceuser?.photoURL} alt="" /></div></Link>
      <Link to={'/block'}>< FaUserLargeSlash className='hover:text-brandcolor'/></Link>
      <Link to={'/sendrequest'}>< IoPeopleSharp className='hover:text-brandcolor'/></Link>
      <Link to={'/message'}>< AiTwotoneMessage className='hover:text-brandcolor'/></Link>
      <button onClick={handlelogout}>< IoLogOutOutline className='hover:text-brandcolor'/></button>
      </nav>

    </>
  )
}

export default Navbar
