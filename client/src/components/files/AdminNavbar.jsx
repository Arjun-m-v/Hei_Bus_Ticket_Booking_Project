import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { NavbarMenu } from '../../mockData/data';
import { IoTicketSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const [open,setOpen] = useState(false)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token from localStorage
    navigate('/');  // Redirect to the login page
  };

  return (
    <>
      <div className=' flex justify-between items-center py-8 border'>
        <div className='m-5 text-2xl flex items-center gap-2 font-bold uppercase'>
          <FaBusAlt />
          <p className='text-red' style={{fontFamily:"cursive"}}>"</p>
          <p style={{fontFamily:"cursive"}}>Hei-</p>
          <p className='text-red' style={{fontFamily:"cursive"}}>Bus</p>
          <p style={{fontFamily:"cursive"}}>"</p>
        </div>
        <div className='hidden md:block'>
          <ul className='flex items-center gap-6 text-gray-600'>
            {
              NavbarMenu.map((item)=>{
                return(
                  <li key={item.id}>
                    <a href={item.link} className='inline-block py-1 px-3 hover-text-red font-semibold'>{item.title}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='flex items-center p-3'>
          {/* <button className='text 4-xl hover:bg-red hover:text-white rounded-full p-4 duration-200'>
            <FaSearch />
          </button> */}
          {/* <button className='text 4-xl hover:bg-red hover:text-white rounded-full p-4 duration-200'>
            <IoTicketSharp />
            </button> */}
            <button onClick={handleLogout} className='hover:bg-red text-red font-semibold hover:text-white 
            rounded-md border-2 border-red px-6 py-2 duration-200 hidden md:block'>
              Logout
            </button>
        </div>
        <div className='md:hidden' onClick={()=>
          setOpen(!open)}>
          <MdMenu className='text-4xl'/>
        </div>
      </div>

      <ResponsiveMenu open={open} />
    </>
  )
}

export default AdminNavbar
