import React, { useState } from 'react';
import logo from '../assets/icon.png';
import bgVideo from '../assets/bgVideo.mp4';

const Login = () => {
  // Separate useState for each form field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the form data object from individual states
    const formData = {
      email,
      password,
    };

    // Logic to send `formData` to the backend API
    console.log('Login Data Submitted:', formData);
    // Make a POST request with formData to your backend
  };

  return (
    <div>
      {/* Background video */}
      <video autoPlay muted loop id="backgroundVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className='h-full'>
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 ">
          <div className="flex max-w-md mx-auto items-center justify-center">
            <h1 className="text-white font-bold text-2xl">Weather Me</h1>
            <img src={logo} alt="logo" className="w-14 h-14" />
          </div>

          <div className="py-auto sm:mx-auto sm:w-full sm:max-w-sm justify-between bg-[#0198afb6] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl mt-5 ">
            <form className="space-y-6 " onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-white">Email address</label>
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
                <label htmlFor="password" className="text-left block text-sm font-medium leading-6 text-white">Password</label>
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

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
