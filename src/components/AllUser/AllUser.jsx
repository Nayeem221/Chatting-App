import React, { useEffect, useState } from 'react'
import CommonUser from '../CommonUser/CommonUser'
import CommonButton from '../CommonButton/CommonButton'
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

const AllUser = () => {






  // take data from redux
  const sliceuser=useSelector((state)=>state.currentUser.value)
    // realtime data variable
    const db = getDatabase();
    // function part  ...................
const handleadd=(data)=>{

  set(push(ref(db, 'friendrequest/' )), {
 senderid: sliceuser.uid,
sendername:sliceuser.displayName,
senderphoto:sliceuser.photoURL,
receiverid:data.key,
receivername:data.username,
receiverphoto:data.userphoto
  });
   
}
// state//////////////////////////
const [Alluser,SetAlluser]=useState([])
useEffect(()=>{
    const starCountRef = ref(db, 'allusers/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
       
      if(item.key!=sliceuser.uid){
        arr.push({...item.val(),key:item.key})
        
      }
      })
      SetAlluser(arr)
    });

    
},[])


  return (
    <>
     <section className='py-[70px]'>
     <div className="container">
        <h2 className='text-center mb-11'>ALl User</h2>
        {
            Alluser.map((item)=>(
<div key={item.key} className='flex alluser mb-5 justify-between'>
            <CommonUser commonuserphoto={item.userphoto} username={item.username} />
            <CommonButton commonbuttonclick={()=>handleadd(item)} commonbuttoncontent={'Add'}/>
            
            </div>
            ))
        }
        
     
     </div>
     </section>
    </>
  )
}

export default AllUser
