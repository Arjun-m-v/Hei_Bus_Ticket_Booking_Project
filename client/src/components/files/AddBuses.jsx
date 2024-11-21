import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function AddBuses() {
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
      price_per_seat: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBus(prevBus => ({
            ...prevBus,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            alert('You are not logged in. Please log in first.');
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`  // Attach token here
            }
        };

        // Send the student data without token in headers
        axios.post('http://localhost:3001/bus/create', bus,config)
            .then(response => {
                navigate('/alanding');  // Redirect to the landing page after adding the student
            })
            .catch(error => {
                console.error("Error adding buzs data:", error);
                alert("Failed to add bus. Please check the console for errors.");
            });
    };

    return (
        <div>
        <Navbar/>
        <div className="container border p-5 m-5" style={{width:'100%'}}>
            <h2 className='text-center'>ADD NEW BUSES...</h2>
            <form onSubmit={handleSubmit} className="" action="#" method="POST">
                <div>
                    <label for="name" className="block text-sm/6 font-medium text-gray-900">Bus Name</label>
                    <div>
                    <input value={bus.name || ''} onChange={handleChange} id="name" name="name" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <label for="reg_no" className="block text-sm/6 font-medium text-gray-900">Registration Number</label>
                    <div>
                    <input value={bus.reg_no || ''} onChange={handleChange} id="reg_no" name="reg_no" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <label for="source" className="block text-sm/6 font-medium text-gray-900">Source</label>
                    <div>
                    <input value={bus.source || ''} onChange={handleChange} id="source" name="source" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                    </div>
                </div>

                <div>
                    <label for="destination" className="block text-sm/6 font-medium text-gray-900">Destination</label>
                    </div>
                    <div>
                    <input value={bus.destination || ''} onChange={handleChange} id="destination" name="destination" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="departure_time" className="block text-sm/6 font-medium text-gray-900">Departure Time</label>
                    </div>
                    <div>
                    <input value={bus.departure_time || ''} onChange={handleChange} id="departure_time" name="departure_time" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="arrival_time" className="block text-sm/6 font-medium text-gray-900">Arrival Time</label>
                    </div>
                    <div>
                    <input value={bus.arrival_time || ''} onChange={handleChange} id="arrival_time" name="arrival_time" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="bus_type" className="block text-sm/6 font-medium text-gray-900">Bus Type</label>
                    </div>
                    <div>
                    <input value={bus.bus_type || ''} onChange={handleChange} id="bus_type" name="bus_type" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="total_seats" className="block text-sm/6 font-medium text-gray-900">Total Seats</label>
                    </div>
                    <div>
                    <input value={bus.total_seats || ''} onChange={handleChange} id="total_seats" name="total_seats" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="available_seats" className="block text-sm/6 font-medium text-gray-900">Available Seats</label>
                    </div>
                    <div>
                    <input value={bus.available_seats || ''} onChange={handleChange} id="available_seats" name="available_seats" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div>

                <div>
                    <label for="price_per_seat" className="block text-sm/6 font-medium text-gray-900">Price Per Seat</label>
                    </div>
                    <div>
                    <input value={bus.price_per_seat || ''} onChange={handleChange} id="price_per_seat" name="price_per_seat" type="text" autoComplete="" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                </div><br />

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
            <Footer/>
        </div>
        </div>
    );
}

export default AddBuses;
