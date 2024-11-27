import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';
import { useNavigate } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    // Determine which field is being changed (source or destination)
    if (e.target.placeholder === "Source") {
      setSource(e.target.value);
    } else if (e.target.placeholder === "Destination") {
      setDestination(e.target.value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/'); // Redirect to the login page
  };

  const handleSearch = () => {
    // Ensure both source and destination are provided
    if (source && destination) {
      // Alert user with the search details
      alert(`Searching buses from ${source} to ${destination}`);
      // Call onSearch to notify the parent with the search query
      onSearch(source, destination);
  



      // Close the modal after initiating the search
      setModalOpen(false);
    } else {
      alert('Please enter both source and destination.');
    }
  };

  return (
    <>
      <div className='flex justify-between items-center py-1 border'>
        <div className='m-5 text-2xl flex items-center gap-2 font-bold uppercase'>
          <FaBusAlt />
          <p className='text-red' style={{ fontFamily: "cursive" }}>"</p>
          <p style={{ fontFamily: "cursive" }}>Hei-</p>
          <p className='text-red' style={{ fontFamily: "cursive" }}>Bus</p>
          <p style={{ fontFamily: "cursive" }}>"</p>
        </div>
        <div className='flex items-center p-3'>
          <button
            className='text-2xl hover:bg-red hover:text-white rounded-full p-4 m-2 duration-200'
            onClick={() => setModalOpen(true)}>
            <FaSearch />
          </button>
          <button className='text-2xl hover:bg-red hover:text-white rounded-full p-4 m-2 duration-200'>
            <IoTicketSharp />
          </button>
          <button
            onClick={handleLogout}
            className='hover:bg-red text-red font-semibold hover:text-white rounded-md border-2 border-red px-6 py-2 duration-200 hidden md:block'
          >
            Logout
          </button>
        </div>
        <div className='md:hidden' onClick={() => setOpen(!open)}>
          <MdMenu className='text-4xl' />
        </div>
      </div>

      <ResponsiveMenu open={open} />

      {/* Search Modal */}
      {isModalOpen && (
        <div className='fixed inset-px bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white rounded-lg p-6 w-96'>
            <h2 className='text-xl font-bold mb-4'>Search Buses</h2>
            <input
              type='text'
              placeholder='Source'
              value={source}
              onChange={handleSearchChange}
              className='w-full p-2 border rounded mb-4'/>
            <input
              type='text'
              placeholder='Destination'
              value={destination}
              onChange={handleSearchChange}
              className='w-full p-2 border rounded mb-4'/>
            <div className='flex justify-between'>
              <button
                onClick={handleSearch}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                Search
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
