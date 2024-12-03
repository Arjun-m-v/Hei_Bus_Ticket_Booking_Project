import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function EditBuses() {
    const { id } = useParams();
    const [bus, setBus] = useState({
        name: '',
        reg_no: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        bus_type: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get(`http://localhost:3001/bus/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.data && response.data.busDetails) {
                    setBus(response.data.busDetails);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching bus data:', error);
                setError('Failed to load bus data');
                setLoading(false);
            });
    }, [id]);

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
            alert('You need to log in first!');
            navigate('/');
            return;
        }

        axios
            .put(`http://localhost:3001/bus/update/${id}`, bus, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                navigate('/alanding');
            })
            .catch((error) => {
                console.error('Error updating bus data:', error);
                alert('Failed to update bus. Please check the console for errors.');
            });
    };

    if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-lg text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Bus Details</h2>
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
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {field.label}:
                                </label>
                                <input
                                    type="text"
                                    id={field.id}
                                    name={field.id}
                                    value={field.value || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

export default EditBuses;
