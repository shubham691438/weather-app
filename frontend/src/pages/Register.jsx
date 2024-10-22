import React, { useState } from 'react';
import logo from '../assets/icon.png';
import bgVideo from '../assets/bgVideo.mp4';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [city, setCity] = useState('bangalore');
  const [temperatureThreshold, setTemperatureThreshold] = useState(15);
  const [conditions, setConditions] = useState(['Rain', 'Snow']);
  const [consecutiveThreshold, setConsecutiveThreshold] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      city,
      temperatureThreshold,
      conditions,
      consecutiveThreshold,
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/api/user/register`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data= await response.json();
      
      if (!response.ok) {
        
        throw new Error(data.error);
      }

     
      setSuccess('Registration successful!');
      setError(null);
      console.log('Response Data:', data);
      navigate(`/threshold-breach-dashboard/${data.userId}/${data.name}`);
    } catch (error) {
        // console.log(error);
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <video autoPlay muted loop id="backgroundVideo">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className='h-full'>
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="flex max-w-md mx-auto items-center justify-center">
            <h1 className="text-white font-bold text-2xl">Weather Me</h1>
            <img src={logo} alt="" className="w-14 h-14" />
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-between bg-[#0198afb6] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl mt-5 p5">
            <form className="space-y- " onSubmit={handleSubmit}>
             
            <div className='flex justify-between'>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="text-left block text-sm font-medium leading-6 text-white">Full Name</label>
                        <div >
                            <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            required 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-white">Email address</label>
                        <div >
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
                </div>

                {/* Password */}
                <div>
                <label htmlFor="password" className="text-left block text-sm font-medium leading-6 text-white">Password</label>
                <div >
                    <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder='At least 8 characters'
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                </div>
                </div>

                {/* City */}
                <div>
                <label htmlFor="city" className="text-left block text-sm font-medium leading-6 text-white">City</label>
                <div >
                    <select
                    id="city" 
                    name="city" 
                    type="text" 
                    required 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    >
                        <option defaultValue="bangalore">bangalore</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="kolkata">Kolkata</option>
                        <option value='hyderabad'>Hyderabad</option>
                        <option value='chennai'>Chennai</option>
                    </select>
                </div>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-between bg-[#0198afb6] p-3 m-2 backdrop-blur-2xl ease-in-out duration-500 rounded-xl mt-5 p5">
                    <p className="font-bold text-red-600 text-start">Define Thresholds</p>

                    <div className="bg-[#0198af99] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl mt-3">
                        {/* Temperature Threshold */}
                        <div>
                        <label htmlFor="temperatureThreshold" className="text-left block text-sm font-medium leading-6 text-white">
                            Temperature (°C)
                        </label>
                        <div>
                            <input
                            id="temperatureThreshold"
                            name="temperatureThreshold"
                            type="number"
                            value={temperatureThreshold}
                            onChange={(e) => setTemperatureThreshold(Number(e.target.value))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        {/* Consecutive Threshold */}
                        <div>
                        <label htmlFor="consecutiveThreshold" className="text-left block text-sm font-medium leading-6 text-white">
                            Consecutive
                        </label>
                        <div>
                            <input
                            id="consecutiveThreshold"
                            name="consecutiveThreshold"
                            type="number"
                            value={consecutiveThreshold}
                            onChange={(e) => setConsecutiveThreshold(Number(e.target.value))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        {/* Weather Conditions */}
                        <div>
                        <label htmlFor="conditions" className="text-left block text-sm font-medium leading-6 text-white">
                            Weather Conditions
                        </label>
                        <div>
                            <select
                            id="conditions"
                            name="conditions"
                            type="text"
                            placeholder="Comma-separated (e.g., Rain, Snow)"
                            value={conditions.join(', ')}
                            onChange={(e) => setConditions(e.target.value.split(',').map((c) => c.trim()))}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                            <option value="rain">Rain</option>
                            <option value="snow">Snow</option>
                            <option value="clear">Clear</option>
                            <option value="clouds">Clouds</option>
                            <option value="thunderstorm">Thunderstorm</option>
                            <option value="drizzle">Drizzle</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
                
              <div className="text-center">
                {error && <p className=" rounded-full text-red-500 cursor-not-allowed font-medium  text-sm  text-center" >{error}</p>}
                {success && <p className=" rounded-full text-green-500 cursor-not-allowed font-medium  text-sm  text-center">{success}</p>}
                {!error && !success && <p className="m-7"> {" "}</p>}
              </div>

              {/* Submit button */}
              <div >
                <button 
                  type="submit" 
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500">
              Already Registered? 
              <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Register;
