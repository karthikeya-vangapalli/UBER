import { Link } from "react-router-dom";
import React, { useState } from "react";

const UserSignup = () => {
  const [fullname, setFullname] = useState({
    firstname: "",
    lastname: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName:{
        firstName: fullname.firstname,
        lastName: fullname.lastname
      },
      email,
      password,
    };

    // console.log("User signup data:", data);

    setFullname({ firstname: "", lastname: "" });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <div className="bg-black w-full h-16 flex items-center">
        <img
          className="w-20 ml-4 object-contain"
          src="https://cdn.dribbble.com/userupload/30846413/file/still-2ebad96f3bcdf511e1a66a295ebd0ea9.png"
          alt="logo"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-2">
            What’s your name?
          </h3>

          <div className="flex gap-3 mb-4">
            <input
              required
              value={fullname.firstname}
              onChange={(e) =>
                setFullname({ ...fullname, firstname: e.target.value })
              }
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              type="text"
              placeholder="First name"
            />

            <input
              required
              value={fullname.lastname}
              onChange={(e) =>
                setFullname({ ...fullname, lastname: e.target.value })
              }
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">
            What’s your email?
          </h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl font-semibold mb-2">
            Create password
          </h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-lg text-lg"
          >
            Continue
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
            By continuing, you agree to calls, including by autodialer, WhatsApp,
            or texts from Uber and its affiliates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup