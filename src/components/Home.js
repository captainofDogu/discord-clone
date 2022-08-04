import React from 'react'
import { ChevronDownIcon, CogIcon, MicrophoneIcon,PhoneIcon } from "@heroicons/react/outline";
import { getAuth } from "firebase/auth";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// Navigate ReDirect yerine getirildi  kullanıcı yoksa /channels sayfasına gidemesin diye 
import { Toaster } from 'react-hot-toast';
import ServerIcon from "../components/ServerIcon"
import { PlusIcon } from '@heroicons/react/outline';
import Channel from './Channel';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { signOut1 } from '../firebase';
import Chat from './Chat';

const Home = () => {
    const auth = getAuth();
    const user = auth.currentUser; 
    console.log(user)
    const [data,setData] = useState([])
    console.log(data.map((product) => product.id))
    const navigate = useNavigate()


    useEffect(() => {
         onSnapshot(collection(db,"channels"), (snapshot) => {
            const data1 =snapshot.docs.map(doc=> {
                const data = doc.data()
                return {id:doc.id, ...data}
            })
            
            console.log(data1)
            setData(data1)
        })

    },[])
    

    function handleSignOut() {
        signOut1()
          .then(() => {
            console.log("Signed Out");
            navigate("/")
          })
          .catch(e => {
            console.log("Error signing out", e);
          });
      }

    const addProduct = () => {
        const channelName = prompt("Enter a new channel name");

        if(channelName) {
            addDoc(collection(db,"channels"),{
                channelName:channelName,
            })
        }
    }    




  return (
    <>

    {!user && <Navigate replace to="/" />}
    <Toaster position="top-center" />
    <div className="flex h-screen">{/* ekranın tamanını kaplar  */}
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max ">
          <div className="server-default hover:bg-discord_purple hover:shadow-2xl">
            <img src="https://www.technopat.net/sosyal/data/avatars/l/272/272838.jpg?1623407737" alt="" className="h-full w-full rounded-full cursor-pointer" />
          </div>
          <hr className=" border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" />
            <div className='server-default hover:bg-blue-200'>
            <PlusIcon className='text-discord_green h-7 group-hover:text-white items-center mt-2 mx-auto ' />
            </div>
        </div>
        <div className="bg-[#2f3136] flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
            Official PAPA Server... <ChevronDownIcon className="h-5 ml-2" />
          </h2>
          <div className=' scrollbar-hide text-discord_channel flex-grow overflow-y-scroll '>
              <div className='flex items-center p-2 mb-2'>
                  <ChevronDownIcon className=' h-3 mr-2' />
                  <h4 className='font-semibold'>Channels</h4>
                  <PlusIcon onClick={addProduct} className=' h-6 ml-auto cursor-pointer hover:text-white' />
                  
              </div>
              <div className='flex flex-col space-y-2 px-2 mb-4'>
                {data.map((product) => (
                    <Channel key={product.id} id={product.id} channelName={product.channelName} />
                ))}
                   
     
                  
              </div>
          </div> 
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer">
              <img
                src={user?.photoURL}
                alt=""
                className="h-10 rounded-full"
                
              />
              <h4 className="text-white text-xs font-medium">
                {user?.displayName}{" "}
                <span className="text-[#b9bbbe] block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
                    

                <div className="text-gray-400 flex items-center">
                    <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                        <MicrophoneIcon className="h-5 icon " />
                    </div>
                    <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                        <PhoneIcon className="h-5 icon" />
                    </div>
                    <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                        <CogIcon className="h-5 icon" />
                    </div>
                </div>
            </div>
            <button onClick={handleSignOut} className=" w-5/6 mx-auto bg-discord_serversBg p-2   text-white rounded-full hover:bg-gray-900">Çıkış yap</button>
        </div>
        <div className='bg-discord_chatBg flex-grow'>
            <Chat />
            
        </div>
    </div>
    </>
  )
}

export default Home