import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Header from './Header'
import {IoHome} from 'react-icons/io5'
import { isActiveStyle, isNoActiveStyle } from '../utils/style'
import DashboardHome from './DashboardHome'
import DashboardSongs from './DashboardSongs'
import DashboardAlbum from './DashboardAlbum'
import DashboardArtits from './DashboardArtits'
import DashboardUser from './DashboardUser'

function Dashboard() {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
        <Header/>

        <div className='w-[60%] my-2 flex items-center justify-between'>
          <NavLink lassName={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle} to={"/dashboard/home"}><IoHome className='text-2xl text-textColor'/></NavLink>
          <NavLink className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle} to={"/dashboard/user"}>User</NavLink>
          <NavLink className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle} to={"/dashboard/song"}>Song</NavLink>
          <NavLink className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle} to={"/dashboard/artist"}>Artits</NavLink>
          <NavLink className={({isActive}) => isActive ? isActiveStyle : isNoActiveStyle} to={"/dashboard/album"}>Album</NavLink>
        </div>

        <div className='my-4 w-full p-4'>
          <Routes>
            <Route path="/home" element={<DashboardHome/>}/>
            <Route path="/user" element={<DashboardUser/>}/>
            <Route path="/artist" element={<DashboardArtits/>}/>
            <Route path="/song" element={<DashboardSongs/>}/>
            <Route path="/album" element={<DashboardAlbum/>}/>
            <Route path="/newsong" element={<DashboardHome/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default Dashboard