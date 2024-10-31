import react from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if(confirmed){
      setIsLoggedIn(false);
       setRedirectToLogin(true); // Set a state to indicate redirect
    }
  };

  if (redirectToLogin) {
    navigate("/", { replace: true }); // Use replace to prevent going back
  }
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
