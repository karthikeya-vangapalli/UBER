import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return <>{children}</>;
};

export default CaptainProtectWrapper;