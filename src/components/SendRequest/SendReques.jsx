import React, { useEffect, useState } from 'react'
import CommonUser from '../CommonUser/CommonUser'
import CommonButton from '../CommonButton/CommonButton'
import Remove from '../common/CommonRemoveButton/Remove'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, remove } from "firebase/database";
const SendReques = () => {
// ALL variable//////////////////////////////
const [all,setall]=useState([])

// rEDUX DATA
const sliceuser=useSelector((state)=>state.currentUser.value)
//   FIREBASE VARIABLE
const db = getDatabase();

// alL FUNCTION
// const handlecancel=()=>{
//   if(senderid==sliceuser.uid){
//     remove(ref(db, 'friendrequest/' ))
//   }
    
  
  
// }
// realtime data 
// printing friendrequest from realtime data 
useEffect(()=>{
    const starCountRef = ref(db, 'friendrequest/' );
    onValue(starCountRef, (snapshot) => {
   let arr=[]
   snapshot.forEach((item)=>{
    if(item.val().senderid==sliceuser.uid){
        arr.push({...item.val(),key:item.key})
    }
   })
   setall(arr)
    });


},[])
const handlecancel=(data)=>{
  remove(ref(db, 'friendrequest/'+data.key ))
}


  return (
    <>
       <section className='py-[70px]'>
     <div className="container">
        <h2 className='text-center mb-11'>Send Request</h2>
     
      {
        all.map((item)=>(
<div  className='flex alluser mb-5 justify-between'>
            <CommonUser username={item.receivername} commonuserphoto={item.receiverphoto}  />
           <div key={item.key} className='flex gap-5'>
           {/* <CommonButton  commonbuttoncontent={'confirm'}  /> */}
            <Remove REmoveButtonClick={()=>handlecancel(item)} RemoveButtonContent={"cancel"}/>
           </div>
            </div>

        ))
      }  
            

            
        
        
     
     </div>
     </section>
    </>
  )
}

export default SendReques
