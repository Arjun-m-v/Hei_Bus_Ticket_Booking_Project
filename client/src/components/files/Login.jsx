import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {

  const [user,setUser] = useState({
    email:'',
    password:'',
  })

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const { name,value } = e.target;
    setUser((prevUser)=>({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      console.log("Sending login request:", user); 
      const response = await axios.post('http://localhost:3001/auth/login', user);

      const role = response.data.data.role;
      
      if (response.data.success) {

          localStorage.setItem('token', response.data.token);

          // const role = response.data.data.role;

          if (role === true) {
            navigate('/alanding');
          } else if (role === false) {
            navigate('/landing');
          } else {
            // If role is undefined or any other unexpected value, redirect to the login page
            navigate('/login');
          }

          alert('Login successful!');
      } else {
          alert('Login failed: ' + response.data.message);
      }
  } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
  }


  
};


  return (
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-40 w-50" src="https://i.pinimg.com/736x/7e/f2/4d/7ef24db3928b30fd17586d85d5c1e912.jpg" alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your Account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" value={user.email} onSubmit={handleSubmit}>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" value={user.email} onChange={handleChange} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" value={user.password} onChange={handleChange} autocomplete="current-password"required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Register</Link>
      </p>
    </div>
  </div>
  )
}

export default Login;
