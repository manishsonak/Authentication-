
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Registration from './Components/Registration'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import { useEffect, useState } from 'react'

function App() {

  const [auth,setauth]=useState(false);

  useEffect(() => {
    
    const value = localStorage.getItem('auth');
    console.log(value);
    
    setauth(value)
    
   
  }, []);
  

  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={auth?<Home/>:<Login/>} />
      <Route path="/signup" element={<Registration />} />
    </Routes>
   </Router>
   </>
  )
}

export default App
