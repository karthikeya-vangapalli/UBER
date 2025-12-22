import { useState } from "react"
import { Link } from "react-router-dom"

const UserLogin = () => {
  const [Email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      Email: Email,
      password: password,
    }

    setUserData(data)
    // console.log(data)

    setEmail("")
    setPassword("")
  }

  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <form onSubmit={submitHandler} className="space-y-4 mb-4">
          <h3 className="text-lg font-medium mb-2">what's your email?</h3>

          <input
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
  to="/captain/login"
  className="block bg-[#10b461] mt-8 text-white font-semibold rounded px-4 py-2 w-full text-lg text-center"
>
  Sign in as Captain
</Link>
      </div>
    </div>
  )
}

export default UserLogin