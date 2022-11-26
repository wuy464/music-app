import React from 'react'
import { getAllUser } from '../api';
import { useStateValue } from '../context/stateProvider'
import { useEffect } from 'react';
export const DashboardCard = ({icon, name, count}) => {
  return (
    <div className='p-4 gap-3 h-auto rounded-lg shadow-md bg-blue-400'>
      {icon}
      <p className='text-xl text-textColor font-semibold '>{name}</p>
      <p className='text-xl text-textColor font-semibold '>{count}</p>
    </div>
  )
}

function DashboardHome() {

  const [{allUsers, allSongs, allArtits, allAlbums}, dispatch] = useStateValue();
  useEffect(() => {
    if(!allUsers)
    getAllUser().then((data) => {
      console.log(data)
    })
    
  }, [])
  return (

    
   <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
    <DashboardCard/>
    <DashboardCard/>
    <DashboardCard/>
    <DashboardCard/>
   </div>
  )
}

export default DashboardHome