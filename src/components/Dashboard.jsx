"use client"
import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar/Sidebar'
import DashboardHeading from './DashboardHeading'
import AddStudent from './AddStudent'
import Navbar from './Navbar'
import CreateComplaint from './CreateComplaint'
import Complaints from './Complaints'
import Profile from './Profile'

function Dashboard() {
    const [active, setActive] = useState(() => {
        const storedActive = localStorage.getItem('active');
        return storedActive || 'Dashboard';
    });

    const [search, setSearch] = useState('')

    // Update localStorage whenever active state changes
    useEffect(() => {
        localStorage.setItem('active', active);
    }, [active]);
    
  
  return (
    <div className="flex mt-4">
        <div className="w-1/5">
            <Sidebar active={active} setActive={setActive}/>
        </div>
        <div className="w-4/5 px-12 gap-4 flex flex-col">
            <Navbar setActive={setActive} search={search} setSearch={setSearch}/>
            {active==='Dashboard'?<DashboardHeading />:null}
            {active==='Create Profile'?<AddStudent />:null}
            {active==='Add'?<CreateComplaint />:null}
            {active==='View'?<Complaints search={search}/>:null}
            {active==='Info'?<Profile />:null}

        </div>
    </div>
  )
}

export default Dashboard
