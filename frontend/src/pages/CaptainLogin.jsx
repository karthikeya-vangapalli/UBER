import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password },
        { withCredentials: true }
      );

      // set captain in context
      setCaptain(res.data.captain);

      // store token for CaptainProtectWrapper
      localStorage.setItem("token", res.data.token);

      // redirect to captain home
      navigate("/captain/home");
    } catch (error) {
      console.error("Captain login failed:", error.response?.data);
      alert("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <form onSubmit={submitHandler} className="space-y-4 mb-4">
          <h3 className="text-lg font-medium">Captain email</h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="captain@example.com"
          />

          <h3 className="text-lg font-medium">Password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-[#10b461] text-white font-semibold rounded px-4 py-2 w-full text-lg"
          >
            Login as Captain
          </button>

          <p className="text-center">
            New Captain?{" "}
            <Link to="/captain/signup" className="text-blue-600">
              Register here
            </Link>
          </p>
        </form>
      </div>

      <Link
        to="/login"
        className="block bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg text-center"
      >
        Sign in as User
      </Link>
    </div>
  );
};

export default CaptainLogin;