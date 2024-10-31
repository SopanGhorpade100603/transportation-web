import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar({setIsLoggedIn}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login state from local storage
    navigate("/",{ replace: true });
  };
  return (
    <>
    <div className="navbar">
    <div className='navbar-headings'>
        <ul>
        <li>Back Office Agent</li>         
        </ul>     
    </div>
    <button className='logout-btn' onClick={handleLogout}>logout
    <i className="fa-solid fa-arrow-right-from-bracket"></i>
    </button>
    </div>
    </>
  )
}
