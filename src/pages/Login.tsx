import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState('admin@geminicleaning.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      const isAdmin = useAuthStore.getState().isAdmin;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFF] relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute inset-0 w-full h-full z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,400 Q400,200 900,350 T1440,200 L1440,600 L0,600 Z" fill="#F6F6FF" />
          <circle cx="350" cy="450" r="300" fill="#fff" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl px-10 py-12 w-full mx-auto flex flex-col items-center" style={{ boxShadow: '0 8px 40px 0 rgba(80, 80, 120, 0.10)' }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary text-center mb-8">Sign in to Degemini</h2>
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mb-2" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#C7B8F5] rounded-md text-lg placeholder-[#C7B8F5] focus:outline-none focus:border-[#3B2E7E] transition"
              placeholder="Your E-mail"
              autoComplete="email"
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#C7B8F5] rounded-md text-lg placeholder-[#C7B8F5] focus:outline-none focus:border-[#3B2E7E] transition"
              placeholder="Your password"
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-2 rounded-md text-lg font-bold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${isLoading ? 'bg-yellow-300 text-gray-600' : 'bg-[#FFE600] text-[#3B2E7E] hover:bg-yellow-400'}`}
              style={{ letterSpacing: '1px' }}
            >
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>
          <a
            href="#"
            className="block mt-4 text-sm text-[#3B2E7E] text-center font-medium hover:underline"
            tabIndex={0}
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; 