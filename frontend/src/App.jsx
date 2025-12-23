import React from "react";
import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Home from "./pages/Home.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
      <Route path="/captain/signup" element={<CaptainSignup />} />
      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
    </Routes>
  );
};

export default App;