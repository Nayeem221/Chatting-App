import React, { useEffect, useState } from 'react'
import CommonUser from '../components/CommonUser/CommonUser'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, onValue, ref } from 'firebase/database'
import { chatData } from '../slices/ChatSlice'

const MessageSidebar = () => {


  // function part 
   const handleuser=(senddata)=>{
console.log(senddata);
dispatch(chatData(senddata))
localStorage.setItem('data',JSON.stringify(senddata))
   } 



    const [allfriend,setallfriend]=useState([])
 // redux data
 const sliceuser=useSelector((state)=>state.currentUser.value) 
const  dispatch=useDispatch()

// firebase variables
const db = getDatabase();
   
//  printing all friends
useEffect(() => {
    onValue(ref(db, "friends/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().currentuserid == sliceuser.uid) {
         arr.push({friendid:item.val().friendid, friendname:item.val().friendname,friendphoto:item.val().friendphoto,key:item.key})

        }else if(item.val().friendid==sliceuser.uid){
             arr.push({friendid:item.val().currentuserid,friendname:item.val().currentusername,friendphoto:item.val().currentuserphoto,key:item.key})
        }
      });
      setallfriend(arr);
    });
  }, []);


  return (
    <>
     <div className='w-[400px] bg-brandcolor p-4 h-screen overflow-scroll'>
        <h2 className='text-xl font-medium mb-5'>friends</h2>

        {
            allfriend.map((item)=>{

                return(
                    <div onClick={()=>handleuser(item)} key={item.key} className='border-b-2 py-4'>
                    <CommonUser username={item.friendname} commonuserphoto={item.friendphoto}/>
                     </div> 


                )
            })
        }
     
     </div>
    </>
  )
}

export default MessageSidebar
