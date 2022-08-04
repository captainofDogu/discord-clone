import React from 'react'
import moment from "moment";
import { useState } from 'react';


const Message = ({id,message,timestamp,name,email, photoURL}) => {

    


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
        </div>
    </div>
  )
}

export default Message