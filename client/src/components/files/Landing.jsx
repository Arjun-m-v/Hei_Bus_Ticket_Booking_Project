import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './landing.css';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Landing() {
  const [data, setData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState({ source: "", destination: "" });
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("You need to log in first.");
          return;
        }
    
        // Destructure source and destination from searchQuery
        const { source, destination } = searchQuery;
        console.log(source, destination);
    
        // Make the API request based on the searchQuery
        const response = await axios.get(
          source && destination
            ? `http://localhost:3001/bus/search?source=${source}&destination=${destination}`
            : 'http://localhost:3001/bus/getall',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data?.message || error.message);
        if (error.response?.status === 400) {
          alert("Invalid search query. Please check your source and destination.");
        }
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchQuery]);


  
  const handleSearchQueryChange = (source, destination) => {
    setSearchQuery({ source, destination });
};



// to={`/edit/${bus.id}`
  return (
    
    <div className="bg-gray-100 min-h-screen">
    <Navbar onSearch={(source, destination) => handleSearchQueryChange(source, destination)} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((bus, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4" id='grid'>
              <h1><b>{bus.source} To {bus.destination}</b></h1>
              <h2 className="text-lg font-bold">{bus.name}</h2>
              <p className="text-gray-600 m-2">{bus.bus_type}</p>
              <p className="text-gray-600 m-2">
                {bus.departure_time} - {bus.arrival_time}
              </p>
              {/* <p className="text-gray-600 m-2">Starts @ ₹{bus.price_per_seat}</p> */}
              {/* <p className="text-gray-600 m-2">Available Seats: {bus.available_seats}</p> */}
              <Link to={`/booking/${bus.id}`} className='btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded mt-2 p-2 m-2'>Book Now</Link>
              {/* <button onClick={() => navigate('/payment')} className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"> */}
                {/* Book Now */}
              {/* </button> */}
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
