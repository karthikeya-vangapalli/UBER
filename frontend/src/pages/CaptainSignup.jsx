import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainContext);

  const [fullname, setFullname] = useState({
    firstname: "",
    lastname: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicalColor, setVehicalColor] = useState("");
  const [vehicalPlate, setVehicalPlate] = useState("");
  const [vehicalCapacity, setVehicalCapacity] = useState("");
  const [vehicalType, setVehicalType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password,
      vechical: {
        color: vehicalColor,
        plate: vehicalPlate,
        capacity: Number(vehicalCapacity),
        vechicalType: vehicalType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        data
      );

      setCaptain(response.data.captain);
      navigate("/captain/home");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-black h-16 flex items-center px-4">
        <img
          className="w-20 object-contain"
          src="https://cdn.dribbble.com/userupload/30846413/file/still-2ebad96f3bcdf511e1a66a295ebd0ea9.png"
          alt="logo"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center items-start p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4"
        >
          <h3 className="text-xl font-semibold">Captain Name</h3>

          <div className="flex gap-3">
            <input
              required
              className="bg-gray-100 w-1/2 px-4 py-2 border rounded text-lg"
              type="text"
              placeholder="First name"
              value={fullname.firstname}
              onChange={(e) =>
                setFullname({ ...fullname, firstname: e.target.value })
              }
            />
            <input
              required
              className="bg-gray-100 w-1/2 px-4 py-2 border rounded text-lg"
              type="text"
              placeholder="Last name"
              value={fullname.lastname}
              onChange={(e) =>
                setFullname({ ...fullname, lastname: e.target.value })
              }
            />
          </div>

          <h3 className="text-xl font-semibold">Captain Email</h3>
          <input
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-xl font-semibold">Password</h3>
          <input
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-xl font-semibold mt-4">Vehicle Details</h3>

          <input
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            type="text"
            placeholder="Vehicle Color"
            value={vehicalColor}
            onChange={(e) => setVehicalColor(e.target.value)}
          />

          <input
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            type="text"
            placeholder="Vehicle Plate Number"
            value={vehicalPlate}
            onChange={(e) => setVehicalPlate(e.target.value)}
          />

          <input
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            type="number"
            placeholder="Vehicle Capacity"
            value={vehicalCapacity}
            onChange={(e) => setVehicalCapacity(e.target.value)}
          />

          <select
            required
            className="bg-gray-100 px-4 py-2 border rounded w-full text-lg"
            value={vehicalType}
            onChange={(e) => setVehicalType(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="motercycle">Bike</option>
          </select>

          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg text-lg hover:bg-gray-900"
          >
            Create Captain Account
          </button>

          <p className="text-center text-sm mt-4">
            Already a Captain?{" "}
            <Link
              to="/captain/login"
              className="text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup