import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";
import Navbar from './Navbar';
import Footer from './Footer';

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
  
        const response = await axios.get('http://localhost:3001/bus/getall', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Check if the data format is as expected
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setData(response.data.data); // Access the correct nested array
        } else {
          console.error("Unexpected data format:", response.data);
          setData([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Handle errors gracefully
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("You need to log in first.");
          return;
      }

        axios.delete(`http://localhost:3001/bus/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setData(prevData => prevData.filter(bus => bus.id !== id));
                alert("Bus deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting Bus:", error);
                alert("Failed to delete Bus.");
            });
    }
};

  return (
  <div className="bg-gray-100 min-h-screen">
    <Navbar/>
    <Row>
      <Col md={1}>
      <Link to="/add" className='btn m-3' style={{ width: "10%", fontSize: '40px', padding: "" }}>
        <MdAddToPhotos className='m-5'/><p style={{fontSize:'15px'}}><b>ADD NEW BUS</b></p>
      </Link>
      </Col>
      <Col md={11}>
        <div className=' overflow-auto p-8 m-33'>
          <table className="w-full border-separate border-spacing-2 border border-slate-800">
          <thead>
              <tr>
              <th className="border border-slate-300 ...">Id</th>
              <th className="border border-slate-300 ...">Bus Name</th>
              <th className="border border-slate-300 ...">Register Number</th>
              <th className="border border-slate-300 ...">Source</th>
              <th className="border border-slate-300 ...">Destination</th>
              <th className="border border-slate-300 ...">Departure Time</th>
              <th className="border border-slate-300 ...">Arrival Time</th>
              <th className="border border-slate-300 ...">Bus Type</th>
              <th className="border border-slate-300 ...">Total Seats</th>
              <th className="border border-slate-300 ...">Available Seats</th>
              <th className="border border-slate-300 ...">Price Per Seat</th>
              </tr>
          </thead>
          <tbody>
          {loading ? (
          <tr>
            <td colSpan="8" className="text-center">Loading...</td>
          </tr>
          ):data.map((bus, index) => (
              <tr key={bus.id}>
              <td className="border border-slate-300 ...">{bus.id}</td>
              <td className="border border-slate-300 ...">{bus.name}</td>
              <td className="border border-slate-300 ...">{bus.reg_no}</td>
              <td className="border border-slate-300 ...">{bus.source}</td>
              <td className="border border-slate-300 ...">{bus.destination}</td>
              <td className="border border-slate-300 ...">{bus.departure_time}</td>
              <td className="border border-slate-300 ...">{bus.arrival_time}</td>
              <td className="border border-slate-300 ...">{bus.bus_type}</td>
              <td className="border border-slate-300 ...">{bus.total_seats}</td>
              <td className="border border-slate-300 ...">{bus.available_seats}</td>
              <td className="border border-slate-300 ...">₹ {bus.price_per_seat}</td>
              <td>
                <Link to={`/edit/${bus.id}`} className='btn'>
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(bus.id)} className="btn"><MdDelete className='text-red'/></button>
              </td>
            </tr>
          ))}
          </tbody>
          </table>
      </div>
      </Col>
    </Row>
    <Footer/>
  </div>
  );
}

export default Landing;


