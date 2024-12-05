import React, { useEffect, useState } from 'react'
import CommonUser from '../CommonUser/CommonUser'
import CommonButton from '../CommonButton/CommonButton'
import Remove from '../common/CommonRemoveButton/Remove'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const Friends = () => {
 const [allfriend,setallfriend]=useState([])
 // redux data
 const sliceuser=useSelector((state)=>state.currentUser.value) 
// firebase variables
const db = getDatabase();

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

   

// all functions
const handleblock=(blockuserdata)=>{
  set(push(ref(db, 'blockusers/')), {
  blockuserid:blockuserdata.friendid,
  blockusername:blockuserdata.friendname,
  blockuserphoto:blockuserdata.friendphoto,
  currentuserid:sliceuser.uid
  });
  remove(ref(db, 'friends/'+blockuserdata.key))
} 



// varibale part 


// realtime database


  return (
    <>
       <section className='py-[70px]'>
     <div className="container">
        <h2 className='text-center mb-11'>Friends</h2>
      
     {allfriend.map((item)=>{
return(

<div key={item.key}  className='flex alluser mb-5 justify-between'>
            <CommonUser  username={item.friendname}  commonuserphoto={item.friendphoto}/>
           <div  className='flex gap-5'>
            <Remove REmoveButtonClick={()=>handleblock(item)}  RemoveButtonContent={"Block"}/>
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

export default Friends
