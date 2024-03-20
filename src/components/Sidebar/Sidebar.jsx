"use client"
import React, { useState } from 'react';
import './sidebar.css';
import { IconContext } from 'react-icons';
import { MdSpaceDashboard } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { BiSolidDownload, BiSolidMessageAltDetail } from "react-icons/bi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';


function Sidebar({ active, setActive}) {
  const router = useRouter();
  // const [active, setActive] = useState('Dashboard');
  
  const handleSignOut = () => {
    localStorage.removeItem("complaintToken");
    router.push('/login');
  };
  return (
    <div className='sidebar'>
      <div className='graduation-cap-container'>
        <img src="/VITB_seal_white.png" alt="VIT Bhopal" />
        {/* <FaGraduationCap  className='h-[8vw] w-[8vw] text-white' /> */}
      </div>
      <div className='menu'>

        <button 
          className={active === 'Dashboard' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Dashboard')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <MdSpaceDashboard />
          </IconContext.Provider>  
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }}>Dashboard</p>
        </button>

        <button 
          className={active === 'Create Profile' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Create Profile')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <MdLibraryBooks />
          </IconContext.Provider>
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }}>Create Profile</p>
        </button>

        <button 
          className={active === 'Add' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Add')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <HiPencil />
          </IconContext.Provider>
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }}>Add / Modify</p>
        </button>

        <button 
          className={active === 'View' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('View')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <BiSolidMessageAltDetail />
          </IconContext.Provider>
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }}>View Complaints</p>
        </button>

        <button 
          className={active === 'Download' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Download')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <BiSolidDownload />
          </IconContext.Provider>
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }}>Download</p>
        </button>

        <button 
          className={active === 'Info' ? 'menu-item active' : 'menu-item'} 
          onClick={() => setActive('Info')}
        >
          <IconContext.Provider value={{ size: '24px' }}>
            <RiContactsBook2Fill />
          </IconContext.Provider>
          <p style={{ fontSize: '1.08vw', textAlign: 'left' }} >User Info</p>
        </button>

      </div>

      <button className= 'menu-item signout' onClick={handleSignOut}>
        <IconContext.Provider value={{ size: '22px' }}>
          <FaSignOutAlt />
        </IconContext.Provider>  
        <p style={{ fontSize: '1.2vw' }}>Logout</p>
      </button>
    </div>
  )
}

export default Sidebar
