import React from 'react'
import {MenuIcon} from "@heroicons/react/outline"
import { Outlet } from 'react-router-dom'
import { signInWithGoogle } from '../firebase' 
import { useNavigate } from 'react-router-dom'  
import { getAuth } from "firebase/auth";


    const Header = () => {

        const auth = getAuth();
        const user = auth.currentUser; 
        console.log(user)

        const navigate = useNavigate()

        const signIn = (e) => {
            e.preventDefault()
            
            signInWithGoogle()
            
            
            navigate("/channels")
        }
        const openDiscord = () => {
            navigate("/channels")
        }
      return (
          <>    
        <header className='flex items-center justify-between py-4 px-6 bg-discord_blue  '>
        

            <a href='/'>
            <img
          src="https://www.technopat.net/sosyal/data/avatars/l/272/272838.jpg?1623407737"
          className="w-50 h-20 object-contain rounded-full"
          alt=""
        />
            </a>
        <div className="hidden lg:flex  space-x-6   ">
        <a className="link ">Download</a>
        <a className="link">Why Discord?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>

      <div className="flex space-x-4">
        <button onClick={!user ? signIn : openDiscord }
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
        >
            {!user ? "Giris Yap": "Open Discord"}
          
        </button>
        <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
        </header>

        <Outlet />
        </>
      )
    }
    
    export default Header