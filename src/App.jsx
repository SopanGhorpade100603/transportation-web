import { useState } from 'react'
import './App.css'
import LoginForm from './component/login/LoginForm'
import Nabvar from './component/Nabvar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import SignUp from './component/login/SignUp'

function App() {
  
  return (
    <>
    <Nabvar />
    {/* <LoginForm /> */}
    <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path='/signup' element={<SignUp />} />
    </Routes>
    </>
  )
}

export default App
