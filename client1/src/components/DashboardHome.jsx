import React from 'react'
import { getAllUser } from '../api';
import { useStateValue } from '../context/stateProvider'
import { useEffect } from 'react';
import { actionType } from "../context/reducer";
import {ImMusic, ImUser} from 'react-icons/im'
import { RiUserStarFill} from 'react-icons/ri'
import { GiMusicalNotes} from 'react-icons/gi'




export const DashboardCard = ({icon, name, count}) => {

  return (
    <div className='p-6 gap-3 w-[150px] h-auto rounded-lg shadow-md bg-blue-400'>
      {icon}
      <p className='text-xl text-textColor font-semibold '>{name}</p>
      <p className='text-xl text-textColor font-semibold '>{count}</p>
    </div>
  )
}

function DashboardHome() {

  const [{allUsers, allSongs, allArtits, allAlbums}, dispatch] = useStateValue();
  useEffect(() => {
    if(!allUsers) {

      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
    if(!allArtits) {

      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTITS,
          allArtits: data.artist
        })
      })
    }
    if(!allSongs) {

      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs
        })
      })
    }
    if(!allAlbums) {

      getAllUser().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.albums
        })
      })
    }
    
  }, [])
  return (

    
   <div className='w-full p-8 flex items-center justify-evenly flex-wrap'>
    <DashboardCard  icon={<ImUser className='text-3xl text-white'/>} name={"Users"} count={allUsers?.length > 0 ? allUsers.length : 0} className="flex flex-col items-center justify-center"/>
    <DashboardCard icon={<ImMusic className='text-3xl text-white '/>} name={"Song"} count={allUsers?.length > 0 ? allUsers.length : 0}/>
    <DashboardCard icon={<RiUserStarFill className='text-3xl text-white'/>} name={"Artits"} count={allUsers?.length > 0 ? allUsers.length : 0} />
    <DashboardCard icon={<GiMusicalNotes className='text-3xl text-white'/>} name={"Album"} count={allUsers?.length > 0 ? allUsers.length : 0}/>
   </div>
  )
}

export default DashboardHome