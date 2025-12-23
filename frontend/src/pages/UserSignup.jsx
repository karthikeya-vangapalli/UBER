import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/usercontext.jsx";

const UserSignup = () => {
  const [fullname, setFullname] = useState({
    firstname: "",
    lastname: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          const newUser = {
  fullname: {
    firstname: fullname.firstname,
    lastname: fullname.lastname,
  },
  email,
  password,
};

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem('token', res.data.token);
        navigate("/Home");
      }

      setFullname({ firstname: "", lastname: "" });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-black w-full h-16 flex items-center">
        <img
          className="w-20 ml-4 object-contain"
          src="https://cdn.dribbble.com/userupload/30846413/file/still-2ebad96f3bcdf511e1a66a295ebd0ea9.png"
          alt="logo"
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-2">What’s your name?</h3>

          <div className="flex gap-3 mb-4">
            <input
              required
              value={fullname.firstname}
              onChange={(e) =>
                setFullname({ ...fullname, firstname: e.target.value })
              }
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              placeholder="First name"
            />

            <input
              required
              value={fullname.lastname}
              onChange={(e) =>
                setFullname({ ...fullname, lastname: e.target.value })
              }
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">What’s your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl font-semibold mb-2">Create password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="Password"
          />

          <button className="bg-black text-white w-full py-2 rounded-lg text-lg">
            Create Account
          </button>
        </form>

        <div className="text-center text-sm space-y-2">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
          <p className="text-xs text-gray-600">
            By continuing, you agree to calls, WhatsApp, or texts from Uber and
            its affiliates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;