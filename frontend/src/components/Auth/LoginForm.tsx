import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { Film } from 'lucide-react';
import axios from "axios";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    if (!email || !password) {
        setError('All fields are required')
        return;
        }
    
    try {
        setIsLoading(true);        
        const {data} = await axios.post('http://localhost:3000/auth/authenticate', {email, password})

        console.log(data);
    } catch (error) {
        setError('Failed to sign in, please check your credentials')
        console.log(error);
    } finally {
        setIsLoading(false);
    }
}

  return (
    <div className="relative w-full h-screen bg-[url('/img/bg-login.jpeg')] bg-cover bg-center bg-no-repeat bg-color flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-8">
        <Link to="/auth" className="flex items-center">
          <Film className="h-8 w-8 text-red-600" />
          <span className="ml-2 text-2xl font-bold text-white">PELISGO</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-xl mx-">
        <div className="bg-black/80 p-10 md:p-20 rounded-md">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10">Sign In</h1>
           
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 mb-6 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-5 rounded bg-zinc-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-5 rounded bg-zinc-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 text-white font-medium p-3 rounded hover:bg-red-700 transition ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="flex items-center justify-between text-zinc-500 text-base">
                <p>
                    <Link to="/auth/forgot-password" className="hover:underline">Forgot your password?</Link>
                </p>
              
                <a href="#" className="hover:underline text-red-300">Anonymous mode</a>
            </div>            
          </form>          
          
          <div className="mt-10 text-zinc-500">            
            <p>
                Don't have an account? <Link to="/auth/register" className="text-white hover:underline">Sign up now</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;