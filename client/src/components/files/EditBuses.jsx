import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { div } from 'framer-motion/client';

function EditBuses() {
    const { id } = useParams(); // Get the student ID from the URL params
    const [bus, setBus] = useState({
        name: '',
        reg_no: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        bus_type: '',
        total_seats: '',
        available_seats: '',
        // price_per_seat: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // To track if there are errors during fetch

    const navigate = useNavigate();

    // Fetch the student data when the component is mounted
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        axios.get(`http://localhost:3001/bus/get/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.data && response.data.busDetails) {
                    setBus(response.data.busDetails);  // Set the student data for editing
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching bus data:", error);
                setError("Failed to load bus data");
                setLoading(false);
            });
    }, [id]);

    // Handle changes to the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBus(prevBus => ({
            ...prevBus,
            [name]: value
        }));
    };

    // Handle form submission to update the student data
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Ensure you have the token

        if (!token) {
            alert('You need to log in first!');
            navigate('/');
            return;
        }

        axios.put(`http://localhost:3001/bus/update/${id}`, bus,{
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                navigate('/alanding');  // Redirect to the landing page after updating the student
            })
            .catch(error => {
                console.error("Error updating bus data:", error);
                alert("Failed to update bus. Please check the console for errors.");
            });
    };

    // Display a loading message or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar/>
        <div className='m-5'>
            <div className="container border p-5 m-5" style={{width:'1000%'}}>
                <h2 className='text-center'>EDIT BUS DETAILS...</h2>
                <form onSubmit={handleSubmit} className="p-3 m-2" action="#" method="POST">
                <div className='m-1'>
                    <label for="name" className="block text-sm/6 font-medium text-gray-900">Bus Name</label>
                    <div>
                    <input value={bus.name || ''} onChange={handleChange} id="name" name="name" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div className='m-1'>
                    <label for="reg_no" className="block text-sm/6 font-medium text-gray-900">Registration Number</label>
                    <div>
                    <input value={bus.reg_no || ''} onChange={handleChange} id="reg_no" name="reg_no" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div className='m-1'>
                    <label for="source" className="block text-sm/6 font-medium text-gray-900">Source</label>
                    <div>
                    <input value={bus.source || ''} onChange={handleChange} id="source" name="source" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div className='m-1'>
                    <label for="destination" className="block text-sm/6 font-medium text-gray-900">Destination</label>
                    </div>
                    <div>
                    <input value={bus.destination || ''} onChange={handleChange} id="destination" name="destination" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div className='m-1'>
                    <label for="departure_time" className="block text-sm/6 font-medium text-gray-900">Departure Time</label>
                    </div>
                    <div>
                    <input value={bus.departure_time || ''} onChange={handleChange} id="departure_time" name="departure_time" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div className='m-1'>
                    <label for="arrival_time" className="block text-sm/6 font-medium text-gray-900">Arrival Time</label>
                    </div>
                    <div>
                    <input value={bus.arrival_time || ''} onChange={handleChange} id="arrival_time" name="arrival_time" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div className='m-1'>
                    <label for="bus_type" className="block text-sm/6 font-medium text-gray-900">Bus Type</label>
                    </div>
                    <div>
                    <input value={bus.bus_type || ''} onChange={handleChange} id="bus_type" name="bus_type" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div className='m-1'>
                    <label for="total_seats" className="block text-sm/6 font-medium text-gray-900">Total Seats</label>
                    </div>
                    <div>
                    <input value={bus.total_seats || ''} onChange={handleChange} id="total_seats" name="total_seats" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div className='m-1'>
                    <label for="available_seats" className="block text-sm/6 font-medium text-gray-900">Available Seats</label>
                    </div>
                    <div>
                    <input value={bus.available_seats || ''} onChange={handleChange} id="available_seats" name="available_seats" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div><br />

                {/* <div className='m-1'>
                    <label for="price_per_seat" className="block text-sm/6 font-medium text-gray-900">Price Per Seat</label>
                    </div>
                    <div>
                    <input value={bus.price_per_seat || ''} onChange={handleChange} id="price_per_seat" name="price_per_seat" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div> */}

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
            </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditBuses;
