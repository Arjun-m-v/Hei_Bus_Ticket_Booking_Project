import React, { useState, useEffect } from 'react';
import { MdOutlineChair } from "react-icons/md";
import Navbar from './Navbar';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';

const Booking = () => {
  const [data, setData] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    selectedSeats.forEach(seatNumber => {
      const seat = data.find(seat => seat.seatNumber === seatNumber);
      if (seat) {
        totalAmount += seat.price; 
      }
    });
    return totalAmount.toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

          const token = localStorage.getItem('token'); 
          if (!token) {
              alert('You are not logged in. Please log in first.');
              return;
          }
      
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          };


        const response = await axios.get(`http://localhost:3001/seat/getall/${id}`,config);
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setData(response.data.data); 
        } else {
          console.error("Unexpected data format:", response.data);
          setData([]); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const seatPrice = data.length > 0 ? data[0].price : 0;

  return (
    <div>
      <Navbar />
      <Container className="my-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : data.length > 0 ? (
          
          <Row>
          <h1 className="text-2xl font-bold mb-2">Select Your Seats :</h1>

            {/* Left side: Seat arrangements */}
            <Col md={8}>

              <div className="border p-3">
                <div className="grid grid-cols-4 gap-1">
                  {data.map((seat, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer hover:text-400 
                        ${seat.isAvailable === false ? 'text-red-500 opacity-500' : ''} 
                        ${selectedSeats.includes(seat.seatNumber) ? 'text-green-500' : ''} 
                        ${seat.isAvailable && !selectedSeats.includes(seat.seatNumber) ? 'text-blue-500' : ''}`}
                      onClick={() => seat.isAvailable && handleSeatSelection(seat.seatNumber)}>
                      <MdOutlineChair
                        className={`text-4xl 
                          ${selectedSeats.includes(seat.seatNumber) ? 'text-green-500' : ''} 
                          ${seat.isAvailable === false ? 'text-red-500 opacity-500' : ''}`}/>
                      <p className="text-sm text-gray-500">{seat.seatNumber}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            {/* Right side: Booking summary */}
            <Col md={4}>
              <div className="border p-3">
                <h2 className="text-2xl font-bold mb-3">Booking Summary</h2>
                <p>Rate of one seat: ₹{seatPrice}</p>
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
                <p>Number of Seats: {selectedSeats.length}</p>
                <p>Total Amount: ₹{calculateTotalAmount()}</p>
                <button
                  onClick={() => navigate('/payment')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                  Confirm Booking
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <p className="text-center">No Seats available.</p>
        )}
      </Container>
    </div>
  );
};

export default Booking;
