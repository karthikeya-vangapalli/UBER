import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState(''); 

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    console.log("Captain Login Data:", data);


    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        {/* Logo */}
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4 mb-4">
          <h3 className="text-lg font-medium mb-2">
            Captain email
          </h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="captain@example.com"
          />

          <h3 className="text-lg font-medium mb-2">
            Enter password
          </h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
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

     
      <div>
        <Link
          to="/login"
          className="block bg-[#111] mt-8 text-white font-semibold rounded px-4 py-2 w-full text-lg text-center"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;