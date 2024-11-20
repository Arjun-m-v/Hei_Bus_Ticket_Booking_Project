import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './landing.css';
import Footer from './Footer';
import axios from 'axios';

function Landing() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

      const token = localStorage.getItem('token'); 
      if (!token) {
        alert("You need to log in first.");
        return;
      }

        const url = await fetch('http://localhost:3001/bus/getall');

        const response = await axios.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });

        // const result = await response.json();
        setData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    
    <div className="bg-gray-100 min-h-screen">
      <Navbar/>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((bus, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4" id='grid'>
              <h1><b>{bus.source} To {bus.destination}</b></h1>
              <h2 className="text-lg font-bold">{bus.name}</h2>
              <p className="text-gray-600">{bus.bus_type}</p>
              <p className="text-gray-600">
                {bus.departure_time} - {bus.arrival_time}
              </p>
              <p className="text-gray-600">Starts @ ₹{bus.price_per_seat}</p>
              <p className="text-gray-600">Available Seats: {bus.available_seats}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No buses available.</p>
      )}
    <Footer/>
    </div>
  );
}

export default Landing;
