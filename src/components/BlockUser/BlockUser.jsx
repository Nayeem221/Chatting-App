import React, { useEffect, useState } from 'react'
import CommonUser from '../CommonUser/CommonUser'
import CommonButton from '../CommonButton/CommonButton'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'

const BlockUser = () => {
    // rEDUX DATA
const sliceuser=useSelector((state)=>state.currentUser.value)
//   FIREBASE VARIABLE
const db = getDatabase();
const [allblockuser,setallblockuser]=useState([])


// realtime data printing
useEffect(() => {
    onValue(ref(db, "blockusers/"), (snapshot) => {
        let arr =[]
      snapshot.forEach((item)=>{
       if(item.val().currentuserid==sliceuser.uid){
        arr.push({...item.val(),key:item.key})
       
       }
      })
      setallblockuser(arr)
    });
  }, []);
// unblock
const handleunblock=(frienddata)=>{
    set(push(ref(db, 'friends/' )),{
     friendid:frienddata.blockuserid,
     friendphoto:frienddata.blockuserphoto,
     friendname:frienddata.blockusername,
     currentuserid:sliceuser.uid,
     currentusername:sliceuser.displayName,
     currentuserphoto:sliceuser.photoURL
    })
    remove(ref(db, 'blockusers/'+ frienddata.key ))
  }
    
  return (
    <>
<section className='py-[70px]'>
     <div className="container">
        <h2 className='text-center mb-11'>Blocklist</h2>
      
{
    allblockuser.map((item)=>{
      return(


<div key={item.key}  className='flex alluser mb-5 justify-between'>
            <CommonUser  username={item.blockusername} commonuserphoto={item.blockuserphoto}  />
           <div  className='flex gap-5'>
           <CommonButton commonbuttonclick={()=>handleunblock(item)}  commonbuttoncontent={'unblock'}  />
            
           </div>
            </div>

      )
    })
}


        
       
            

            
        
        
     
     </div>
     </section>
    </>
  )
}

export default BlockUser
