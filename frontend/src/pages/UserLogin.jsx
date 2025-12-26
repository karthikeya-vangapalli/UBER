import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/usercontext.jsx";

const UserLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ DEFINE data
    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        { withCredentials: true }
      );

      // ✅ save user
      if (response.data.user) {
        setUser(response.data.user);
      }

      // ✅ save token if sent
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/home");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Login failed");
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
          <h3 className="text-lg font-medium mb-2">Email</h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Password</h3>

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
            className="bg-black text-white font-semibold rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center">
            New user?{" "}
            <Link to="/signup" className="text-blue-600">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin