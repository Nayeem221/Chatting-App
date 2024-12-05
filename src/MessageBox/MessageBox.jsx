import InputEmoji from "react-input-emoji";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { IoMdSend } from "react-icons/io";
const MessageBox = () => {
  // Taking Redux data
  const userslice = useSelector((userdata) => userdata.ChatUser.value);
  const Sliceuser = useSelector((userdata) => userdata.currentUser.value);
console.log(Sliceuser);
  // State for input text
  const [text, setText] = useState("");
const [msg,setallmsg]=useState([])
  // Firebase Realtime Database instance
  const db = getDatabase();

  // Function to handle message submission
  const handleOnEnter=()=> {
    setText('')
    set(push(ref(db, "msg/")), {
      
      senderid:Sliceuser.uid,
      receiverid:userslice.friendid,
      
      msg:text,
    
    });
   
  }
  // realtime database printing 
  useEffect(()=>{
 let arr=[]
    const starCountRef = ref(db, 'msg/' );
    onValue(starCountRef, (snapshot) => {
snapshot.forEach((item)=>{
  if(item.val().senderid==Sliceuser.uid&&item.val().receiverid==userslice.friendid){
    arr.push({...item.val(),key:item.key})
  }else if(item.val().senderid==userslice.friendid&&item.val().receiverid==Sliceuser.uid){
    arr.push({...item.val(),key:item.key})
  }
})
setallmsg(arr)
    });
    

  },[userslice])  

  return (
    <>
      <section className="msgbox w-full">
        <div className="msgboxbar py-3 px-5 bg-brandcolor flex gap-2 items-center">
          <div className="userphoto w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-400">
            <img src={userslice?.friendphoto} alt="userphoto" />
          </div>
          <h2 className="text-xl font-semibold">{userslice?.friendname}</h2>
        </div>

        {/* User message */}
        <div className="w-full h-[800px] bg-gray-100 p-3">
          {/* Receiver message */}
          {
            msg.map((item)=>(
              item.senderid==Sliceuser.uid?
              <div className="py-2 px-2 bg-brandcolor mt-5 w-fit rounded-[8px]"> {item.msg}</div>

          :
          <div className="py-2 px-2 bg-black text-white w-fit rounded-[8px] mt-5 mr-5 ml-auto">
          {item.msg}
          </div>
            ))
          }
         
          {/* sender message */}
          
        </div>

       <div className="flex items-center  ">
       <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <IoMdSend onClick={handleOnEnter} className="text-2xl cursor-pointer "/>
       </div>
      </section>
    </>
  );
};

export default MessageBox;
