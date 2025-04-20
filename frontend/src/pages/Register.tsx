import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    if([name, email, password, confirmPassword].includes('')) {
      setAlerta({
        msg: 'All fields are required',
        error: true
      })
      return
    }

    if(password !== confirmPassword) {
      setAlerta({
        msg: 'Passwords do not match',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'Password must be at least 6 characters long',
        error: true
      })
      return
    }
    setAlerta({})

    // Call the API to register the user
    try {
      const answer = await axios.post('http://localhost:3000/auth/register', {name, email, password})
      console.log(answer)
    } catch (error) {
      console.log(error);
      
    }

  }

  const { msg } = alerta

    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl md:text-left sm:text-center">Create your acount and watch {""}<span className="text-black">your favorite movies</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Name
                </label>
                <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Your Name"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                </label>
                <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="example@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
                </label>
                <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Your Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Confirm Password
                </label>
                <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="Repeat your password"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <input type="submit" value="Create Account" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/auth" className="block text-center my-5 text-gray-500">¿Already have an account? Log In</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Register