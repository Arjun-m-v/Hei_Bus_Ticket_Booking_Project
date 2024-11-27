import React, { useState, useEffect } from 'react';
import { MdOutlineChair } from "react-icons/md";
import Navbar from './Navbar';
import axios from 'axios'; // Import axios to fetch data
import { useParams } from 'react-router-dom';


const Booking = () => {
  const [data, setData] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();


  const calculateTotalAmount = () => {
    let totalAmount = 0;
    selectedSeats.forEach(seatNumber => {
      const seat = data.find(seat => seat.seatNumber === seatNumber);
      if (seat) {
        totalAmount += seat.price; // Add the price of each selected seat
      }
    });
    return totalAmount.toFixed(2); // Format the amount to 2 decimal places
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem('token'); 
        // if (!token) {
        //   alert("You need to log in first.");
        //   return;
        // }

        const response = await axios.get(`http://localhost:3001/seat/getall/${id}`);
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
  {loading ? (
    <p className="text-center">Loading...</p>
  ) : data.length > 0 ? (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>
      <div className="border p-2 m-2">
        <div className="grid gap-4">
          {/* Render the seats dynamically based on the data */}
          <div className="grid grid-cols-4 gap-1">
            {data.map((seat, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:text-400 
                  ${seat.isAvailable === false ? 'text-red-500 opacity-500' : ''} 
                  ${selectedSeats.includes(seat.seatNumber) ? 'text-green-500' : ''} 
                  ${seat.isAvailable && !selectedSeats.includes(seat.seatNumber) ? 'text-blue-500' : ''}
                `}
                onClick={() => seat.isAvailable && handleSeatSelection(seat.seatNumber)}
              >
                <MdOutlineChair
                  className={`text-4xl 
                    ${selectedSeats.includes(seat.seatNumber) ? 'text-green-500' : ''} 
                    ${seat.isAvailable === false ? 'text-red-500 opacity-500' : ''}
                    `}
                />
                <p className='text-1xl text-gray-500'>
                  {seat.seatNumber}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 border m-2 p-2">
      <h2 className="text-2xl font-bold mb-4">Rate of one seat : ₹{seatPrice}</h2>
        <p>Selected Seats: {selectedSeats.join(', ')}</p><br />
        <p>Number of Seats: {selectedSeats.length} </p><br />
        <p>Total Amount : ₹{calculateTotalAmount()} </p><br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Confirm Booking
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center">No Seats available.</p>
  )}
</div>

  );
};

export default Booking;
