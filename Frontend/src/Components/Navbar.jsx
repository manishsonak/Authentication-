
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {

    const [auth,setauth]=useState(false);

  useEffect(() => {
    
    const value = localStorage.getItem('auth');
    console.log(value);
    
    setauth(value)
    
   
  }, []);
  const navigate=useNavigate();

  const logout= async()=>{
    const signup= await axios.get('http://localhost:4000/logout')

    if(signup){
        localStorage.removeItem('auth');
        navigate('/')
        return;
    }
  }

  
  
    
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          MyApp
        </div>
        {
            auth ? <div className="space-x-4">
            <button onClick={logout} className="text-white hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded">
              Logout
            </button>
        
          </div> :<div className="space-x-4">
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded">
              Register
            </Link>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
