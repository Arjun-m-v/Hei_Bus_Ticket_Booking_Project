import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './landing.css';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoEarth } from "react-icons/io5";

function Landing() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ source: "", destination: "" });
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null); // State to store the distance
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("You need to log in first.");
          return;
        }

        const response = await axios.get(
          searchQuery.source && searchQuery.destination
            ? `http://localhost:3001/bus/search?source=${searchQuery.source}&destination=${searchQuery.destination}`
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
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data?.message || error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const origin = '9.9312,76.2673'; 
        const destination = '12.9716,77.5946'; 
        const apiKey = 'qt6s2PT1CR07PD7SaOAApzfftVSPoCEkw8H5aF30cGda4h6yTpggxVEBblNMhTMm';

        const response = await axios.get(
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
        );

        if (response.data && response.data.rows[0].elements[0].status === "OK") {
          setDistance(response.data.rows[0].elements[0].distance.text); // Extract the distance
        } else {
          setDistance("Unable to calculate distance");
        }
      } catch (error) {
        console.error("Error fetching distance:", error);
        setDistance("Error calculating distance");
      }
    };

    fetchDistance();
  }, []);

  const handleSearchQueryChange = (source, destination) => {
    setSearchQuery({ source, destination });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onSearch={(source, destination) => handleSearchQueryChange(source, destination)} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((bus, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 relative" id="grid">
              <h1 className="absolute top-3 right-5"><b>{bus.source} To {bus.destination}</b></h1>
              <p className="text-gray-600 m-2 absolute top-7 right-3">
                {bus.departure_time} - {bus.arrival_time}
              </p>
              <p className="absolute bottom-4 right-3 text-gray-600 m-2">Distance : {distance || "Loading distance..."}</p>
              <Link to={`/map`} className="absolute bottom-3 right-3"><IoEarth /></Link>
              <h2 className="text-lg font-bold">{bus.name}</h2>
              <p className="text-gray-600 m-2">{bus.bus_type}</p>
              <Link to={`/booking/${bus.id}`} className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded mt-2 p-2 m-2">Book Now</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No buses available.</p>
      )}

      <Footer />
    </div>
  );
}

export default Landing;
