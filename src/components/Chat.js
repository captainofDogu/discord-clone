import { BellIcon, ChatIcon,  GiftIcon,
    EmojiHappyIcon, HashtagIcon, PlusCircleIcon, UsersIcon } from '@heroicons/react/outline'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../features/channelSlice'
import { getAuth } from "firebase/auth";
import { InboxIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { serverTimestamp } from 'firebase/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';
import { useState } from 'react';
import Message from './Message';
import { query, orderBy, limit } from "firebase/firestore";  



const Chat = () => {

    const [data,setData] = useState([])

/*     const q = query(citiesRef, orderBy("name", "desc"), limit(3));
 */   
    const channelName = useSelector(selectChannelName)
   const channelId = useSelector(selectChannelId)
        console.log(channelId)
        // orderBy için
        // https://javascript.plainenglish.io/nextjs-firebase-v9-part-2-read-todos-602be605aab6
        useEffect(() => {
            onSnapshot(query(collection(db,`channels/${channelId}/messages`),orderBy("timestamp","asc")), (snapshot) => {
                const data1 =snapshot.docs.map(doc => {
                    const data = doc.data()
                    return {id:doc.id , ...data}
                })
                console.log(data1)
                setData(data1)
            })
    
        },[channelName])

    const auth = getAuth();
    const user = auth.currentUser; 

   const chatRef = useRef()
   const inputRef = useRef(null)

   // mesaj yazıldıkça oto scroll yapıyor 
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

/* Bazen kullanıcıya gözükmeyen ancak formu gönderdiğimizde gitmesini istediğimiz değerler olacak. Bu gibi durumlarda gözükmeyen ancak form içerisinde gönderildiğinde gitmesi için hidden tipini kullanacağız */
   const sendMessage = async(e) => {
        e.preventDefault()
        const docRef = await addDoc(collection(db, `channels/${channelId}/messages`), {
            channelId: channelId,
            message:inputRef.current.value,
            timestamp: serverTimestamp(),
            name: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
          });
          inputRef.current.value = " ";
          scrollToBottom()
   }


  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
            />
            <SearchIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
        </header>
        <main className="flex-grow overflow-y-scroll scrollbar-hide ">
        {
            data.map(veri => {
                return (
                <Message
                    key={veri.id}
                    id={veri.id}
                    message={veri.message}
                    timestamp={veri.timestamp}
                    name={veri.name}
                    email={veri.email}
                    photoURL={veri.photoURL}
              />
              )
            })
        } 

            <div ref={chatRef} className="pb-16" />
        </main>
        

            <div className='flex mx-5 mb-7 rounded-lg items-center p-2.5 bg-[#40444b] '>
            <PlusCircleIcon className='icon mr-4' />
            <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
            <GiftIcon className="icon mr-2" />
                <EmojiHappyIcon className="icon" />
            </div>
        
    </div>
  )
}

export default Chat