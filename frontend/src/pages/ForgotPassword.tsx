import { Link } from "react-router-dom"

const ForgotPassword = () => {
    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">Recover your access and {""}<span className="text-black">your favorite films</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          
          <form>              
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                      Email
                  </label>
                  <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " placeholder="example@example.com"/>
              </div>

              <input type="submit" value="Send Code" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link to="/auth" className="block text-center my-5 text-gray-500">¿Already have an account? Log In</Link>
            <Link to="/auth/register" className="block text-center my-5 text-gray-500">Don't have an account? Sign Up</Link>
          </nav>
        </div>
      </>
    )
  }
  
  export default ForgotPassword