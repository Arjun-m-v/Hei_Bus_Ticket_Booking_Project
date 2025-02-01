import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AddSeats() {
  const { id } = useParams(); // Bus ID from URL
  const [seatDetails, setSeatDetails] = useState({
    totalSeats: '', // Total seats to generate
    price: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeatDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Please log in first.');
        return;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const requestData = {
        totalSeats: seatDetails.totalSeats, // Corrected from seat.seatNumber
        price: seatDetails.price, // Corrected from seat.price
        busId: id, // Use the bus ID from params
    };

      
    axios.post('http://localhost:3001/seat/createSeats', requestData, config)
        .then((response) => {
            alert(`${requestData.totalSeats} seats created successfully.`);
            navigate('/alanding');
        })
        .catch((error) => {
            console.error('Error adding seats:', error);
            alert('Failed to add seats. Please check the console for errors.');
        });
};



  return (
    <div>
      <Navbar />
      <div className="border p-5 m-5">
        <h2 className="text-center">Add Seats</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="totalSeats"
              className="m-2 block text-sm font-medium text-gray-900">
              Total number of seats:
            </label>
            <input
              value={seatDetails.totalSeats || ''}
              onChange={handleChange}
              id="totalSeats"
              name="totalSeats"
              type="number"
              required
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm"/>
          </div>

          <div>
            <label
              htmlFor="price"
              className="m-2 block text-sm font-medium text-gray-900">
              Price per seat:
            </label>
            <input
              value={seatDetails.price || ''}
              onChange={handleChange}
              id="price"
              name="price"
              type="number"
              required
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm"/>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddSeats;
