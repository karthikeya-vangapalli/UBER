import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-bottom bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg)] h-screen pt-8 flex justify-between flex-col w-full">
        
        <img
          className="w-16 ml-9"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started Uber</h2>

          
          <Link
            to="/login"
            className="block text-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Home