import React, { useState } from 'react';
import './sidebar.css';

import { IconContext } from 'react-icons';
import { MdSpaceDashboard } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import GraduationCap from '../../images/Graduation Cap.svg'

function Sidebar() {
  const[active, setActive] = useState('Dashboard')

  return (
    <div className='sidebar'>
      <div className='graduation-cap-container'>
        <img src={GraduationCap} alt="Graduation Cap"/>
      </div>
      <div className='menu'>

        <button 
          className={active === 'Dashboard' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Dashboard')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <MdSpaceDashboard />
          </IconContext.Provider>  
          <p>Dashboard</p>
        </button>

        <button 
          className={active === 'Create Profile' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Create Profile')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <MdLibraryBooks />
          </IconContext.Provider>
          <p>Create Profile</p>
        </button>

        <button 
          className={active === 'Add' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Add')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <HiPencil />
          </IconContext.Provider>
          <p>Add / Modify</p>
        </button>

        <button 
          className={active === 'View' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('View')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <BiSolidMessageAltDetail />
          </IconContext.Provider>
          <p>View Complaints</p>
        </button>

        <button 
          className={active === 'Info' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Info')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <RiContactsBook2Fill />
          </IconContext.Provider>
          <p>User Info</p>
        </button>

      </div>

      <button className= 'menu-item signout' onClick={() => console.log('SignOut')}>
        <IconContext.Provider value={{ size: '22px' }}>
          <FaSignOutAlt />
        </IconContext.Provider>  
        <p>Logout</p>
      </button>
    </div>
  )
}

export default Sidebar
