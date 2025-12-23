import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home.jsx"
import UserLogin from "./pages/UserLogin.jsx"
import UserSignup from "./pages/UserSignup.jsx"
import CaptainLogin from "./pages/CaptainLogin.jsx"
import CaptainSignup from "./pages/CaptainSignup.jsx"
import { UserDataContext } from "./context/UserContext.jsx"

const App = () => { 


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
      <Route path="/captain/signup" element={<CaptainSignup />} />
    </Routes>
  )
}

export default App