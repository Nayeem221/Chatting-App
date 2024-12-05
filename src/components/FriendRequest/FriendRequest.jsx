import React, { useEffect, useState } from 'react'
import CommonUser from '../CommonUser/CommonUser'
import CommonButton from '../CommonButton/CommonButton'
import Remove from '../common/CommonRemoveButton/Remove'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
const FriendRequest = () => {
// ALL variable//////////////////////////////
const [all,setall]=useState([])

// rEDUX DATA
const sliceuser=useSelector((state)=>state.currentUser.value)
//   FIREBASE VARIABLE
const db = getDatabase();

// alL FUNCTION
const handleremove=(data)=>{
 remove(ref(db, 'friendrequest/'+data.key ))
}

const handleconfirm=(frienddata)=>{
  set(push(ref(db, 'friends/' )),{
   friendid:frienddata.senderid,
   friendphoto:frienddata.senderphoto,
   friendname:frienddata.sendername,
   currentuserid:sliceuser.uid,
   currentusername:sliceuser.displayName,
   currentuserphoto:sliceuser.photoURL
  })
  remove(ref(db, 'friendrequest/'+frienddata.key ))
}
// realtime data 
// printing friendrequest from realtime data 
useEffect(()=>{
    const starCountRef = ref(db, 'friendrequest/' );
    onValue(starCountRef, (snapshot) => {
   let arr=[]
   snapshot.forEach((item)=>{
    if(item.val().receiverid==sliceuser.uid){
        arr.push({...item.val(),key:item.key })
    }
   })
   setall(arr)
    });


},[])



  return (
    <>
       <section className='py-[70px]'>
     <div className="container">
        <h2 className='text-center mb-11'>Friend request</h2>
      {
        all.map((item)=>(
<div  className='flex alluser mb-5 justify-between'>
            <CommonUser username={item.sendername} commonuserphoto={item.senderphoto}  />
           <div key={item.key} className='flex gap-5'>
           <CommonButton commonbuttonclick={()=>handleconfirm(item)}  commonbuttoncontent={'confirm'}  />
            <Remove REmoveButtonClick={()=>handleremove(item)} RemoveButtonContent={"cancel"}/>
           </div>
            </div>

        ))
      }  
            

            
        
        
     
     </div>
     </section>
    </>
  )
}

export default FriendRequest
