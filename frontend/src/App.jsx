// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import SignUp from './page/SignUp/SignUp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
