import React, { useEffect, useState } from "react";
import { FaUser, FaComments } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-opacity-10 border-white backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg mb-3">
            <FaComments className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-sm mt-1">Sign in to join the conversation</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-purple-500" />
              </div>
              <input
                type="text"
                name="username"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Your username"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoKeySharp className="text-pink-500" />
              </div>
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Your password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-pink-600 hover:underline transition-colors"
          >
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;