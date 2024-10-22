import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';
import bgVideo from '../assets/bgVideo.mp4';
import Lottie from "lottie-react";
import loginAnimation from '../assets/json/loginAnimation.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess('Login successful!');
      setError(null);
      console.log('Response Data:', data);

      // Redirect to the dashboard or home after successful login
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <video autoPlay muted loop id="backgroundVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="h-full">
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="flex max-w-md mx-auto items-center justify-center">
            <h1 className="text-white font-bold text-2xl">Weather Me</h1>
            <img src={logo} alt="" className="w-14 h-14" />
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-between bg-[#0198afb6] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl mt-5 p5">
            <form className="space-y-" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="text-left block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="text-center">
                {error && <p className="rounded-full text-red-500 font-medium text-sm">{error}</p>}
                {success && <p className="rounded-full text-green-500 font-medium text-sm">{success}</p>}
                {!error && !success && <p className="m-7">{" "}</p>}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500">
              Not registered yet?
              <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

       <div className='w-[400px] h-[300px] mx-auto'>
        <Lottie animationData={loginAnimation} />
        </div> 
    </div>
  );
};

export default Login;
