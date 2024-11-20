import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { NavbarMenu } from '../../mockData/data';
import { IoTicketSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';

function Navbar() {
  const [open,setOpen] = useState(false)
  return (
    <>
      <div className='container flex justify-between items-center py-8'>
        <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
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
        <div className='flex items-center gap-4'>
          <button className='text 4-xl hover:bg-red hover:text-white rounded-full p-4 duration-200'>
            <FaSearch />
          </button>
          <button className='text 4-xl hover:bg-red hover:text-white rounded-full p-4 duration-200'>
            <IoTicketSharp />
            </button>
            <button className='hover:bg-red text-red font-semibold hover:text-white 
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

export default Navbar