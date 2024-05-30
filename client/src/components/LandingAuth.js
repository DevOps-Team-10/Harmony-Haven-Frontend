import React, { useState, useContext } from "react";
import UserContext from '../context/UserContext.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandingAuth = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/register",
        { fullName, email, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatusMessage(res?.data?.message);
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
      setIsRegistered(true);
    } catch (error) {
      setStatusMessage(error?.response?.data?.message);
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/user/login',
        { email: loginEmail, password: loginPassword },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setUser(res.data);
      setStatusMessage(res?.data?.message);
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
      navigate('/');
    } catch (error) {
      setStatusMessage(error?.response?.data?.message);
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
    }
  };

  const toggleForm = () => {
    setIsRegistered((prev) => !prev);
    setStatusMessage("");
    setUsername("");
    setEmail("");
    setPassword("");
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Welcome to Harmony Haven. A one-stop solution to being fit.
      </h1>
      {statusMessage && (
        <div className="w-full max-w-sm bg-green-100 p-1 rounded-lg shadow-md mb-2 text-green-800 text-center">
          {statusMessage}
        </div>
      )}
      {isRegistered ? (
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mt-4"
            >
              Not registered? Sign up
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mt-4"
            >
              Already registered? Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LandingAuth;
