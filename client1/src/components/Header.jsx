import React, { useState } from 'react'
import {Logo} from '../assets/img'
import {NavLink, useNavigate} from "react-router-dom"
import {isActiveStyle, isNoActiveStyle} from '../utils/style';
import { FaCrown, FaStar} from 'react-icons/fa'
import {useStateValue} from '../context/stateProvider'
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import {animate, motion} from 'framer-motion';
function Header() {
    const [{user}, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate()
    const LogOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", 'false');

        }).catch((e) => console.log(e))
        navigate("/login", {replace: true})
    }

  return (
   <header className='flex items-center w-full p-4 md:py-2 md:px-6 bg-primary'>
    <NavLink to={"/"}>
        <img src={Logo} alt="logo-img" className='w-16' />
    </NavLink>
    <ul className='flex items-center justify-center ml-7'>
    <li className='mx-5 text-lg'><NavLink to={"/home"} className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle}>Home</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={"/musics"} className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle}>Music</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={"/premium"} className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle}>Premium</NavLink></li>
    <li className='mx-5 text-lg'><NavLink to={"/contact"} className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle}>Contact Us</NavLink></li>
    </ul>

    <div onMouseEnter={() => setIsMenu(true)} onMouseLeave={() => setIsMenu(false)} 
    className='flex items-center ml-auto cursor-pointer gap-2 relative'>
        <img className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' src={user?.user.imageURL} alt="" referrerPolicy='no-referrer' />
        <div className='flex flex-col'>
            <p className='text-textColor text-lg hover:text-headingColor font-semibold '>{user?.user.name}</p>
            <p className=' flex items-center text-xs gap-2 text-gray-500 font-normal '>Primium Member. <FaCrown className=' text-yellow-500 '/></p>
        </div>
       {isMenu && (
         <motion.div initial={{opacity: 0, y:50}} animate={{opacity: 1, y:0}} exit={{opacity:0, y: 50}} className='absolute z-10 top-12 p-4 right-0 w-275 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
         <NavLink to={'/userProfile'}>
             <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out '>Profile</p>
         </NavLink>
             <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out '>My Favourites</p>
             <hr />
             {
                user?.user.role ==='admin' && (

            <NavLink to={'/dashboard/home'}>
            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out '>Dashboard</p>
            </NavLink>
                )
             }
             <p onClick={LogOut} className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out '>Sign Out</p>
     </motion.div>
       )}
    </div>

   </header>
  )
}

export default Header