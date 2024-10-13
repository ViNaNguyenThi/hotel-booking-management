// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './page/Home/Home.jsx'
import Login from './page/Login/Login.jsx'
import SignUp from './page/SignUp/SignUp.jsx'
import LoginAdmin from './page/LoginAdmin/LoginAdmin.jsx'
import HomeAdmin from './page/Home/HomeAdmin.jsx'
import HomeLeTan from './page/Home/HomeLeTan.jsx'
import ForgotPassword from './page/Login/ForgotPassword.jsx'
import ResetPassword from './page/Login/ResetPassword.jsx'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/homeletan" element={<HomeLeTan />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
