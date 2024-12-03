import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function AddBuses() {
    const [bus, setBus] = useState({
        id: '',
        name: '',
        reg_no: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        bus_type: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBus((prevBus) => ({
            ...prevBus,
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

        axios
            .post('http://localhost:3001/bus/create', bus, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const createdBusId = response.data.busId;
                if (createdBusId) {
                    navigate(`/addseats/${createdBusId}`);
                } else {
                    alert('Bus created, but no bus ID returned from the server.');
                }
            })
            .catch((error) => {
                console.error('Error adding bus data:', error);
                alert('Failed to add bus. Please check the console for errors.');
            });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Add New Bus
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { id: 'name', label: 'Bus Name', value: bus.name },
                            { id: 'reg_no', label: 'Registration Number', value: bus.reg_no },
                            { id: 'source', label: 'Source', value: bus.source },
                            { id: 'destination', label: 'Destination', value: bus.destination },
                            { id: 'departure_time', label: 'Departure Time', value: bus.departure_time },
                            { id: 'arrival_time', label: 'Arrival Time', value: bus.arrival_time },
                            { id: 'bus_type', label: 'Bus Type', value: bus.bus_type },
                        ].map((field) => (
                            <div key={field.id}>
                                <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    id={field.id}
                                    name={field.id}
                                    value={field.value || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddBuses;
