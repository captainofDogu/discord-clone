import React from 'react'
import moment from "moment";
import { TrashIcon } from '@heroicons/react/outline';
import { getAuth } from "firebase/auth";
import { deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { doc } from "firebase/firestore";
import { db } from '../firebase';
import { selectChannelId } from '../features/channelSlice'




const Message = ({id,message,timestamp,name,email, photoURL}) => {

    const channelId = useSelector(selectChannelId);

    const auth = getAuth();
    const user = auth.currentUser; 
    console.log(user)

  return (
    <div className='flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353B] group'>
        <img src={photoURL} alt="" className='h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl'  />
        <div className='flex flex-col'>
            <h4>
                <span className="hover:underline text-white text-sm cursor-pointer">
                    {name}
                </span>
                <span className="text-[#72767d] text-xs">
                {
                moment(timestamp?.toDate().getTime()).format("lll")
                
                }
                </span>
            </h4>
            <p className='text-sm text-[#dcddde] '>{message}</p>
        </div>
        <div className='hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer'>
        {
            user?.email === email &&  (
                <div onClick={() => deleteDoc(doc(db,`channels/${channelId}/messages`,id)) }>
                    <TrashIcon  className="h-5 hidden group-hover:inline"    />
                </div>
            )
        }
        </div>
    </div>
  )
}

export default Message