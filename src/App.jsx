import { useState } from 'react'
import './App.css'
import LoginForm from './component/login/LoginForm'
import Navbar from './component/Navbar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import SignUp from './component/login/SignUp'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
 
  function ProtectedRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  }
  return (
    <>
     {isLoggedIn && <Navbar  setIsLoggedIn={setIsLoggedIn} />} {/* Show Navbar only when logged in */}
    <Routes>
    <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/dashboard" replace element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }  />
    <Route path='/signup' element={<SignUp />} />
    </Routes>
    </>
  )
}

export default App
