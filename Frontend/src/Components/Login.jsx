import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here

    const logn= await axios.post('http://localhost:4000/login',{
        email:email,
        password:password
    },{
        withCredentials: true, 
      })

    if (logn) {
        
        localStorage.setItem('auth',true);
        navigate("/home")
        return;
    }
    
    alert("Invalid email or password");

  
    
    
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-8 w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
);
};


export default Login