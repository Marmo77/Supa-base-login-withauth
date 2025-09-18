import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Apple, User } from "lucide-react";
import { FaGithub, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

// this is schematic for great start of website with Logging/Signing Up with Supabase :D
// Credits: https://www.github.com/Marmo77

const Login = ({ setSession, appleLogin }) => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setError(error);
        throw error;
      }
      setError(null);
      // Successfully logged in
      navigate("/");
      setSession(data.session);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };
  const handleAppleSignIn = () => {
    // Apple sign in logic here
    console.log("Apple sign in clicked");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-lg:max-w-xl max-w-6xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Banner Section - You'll replace this */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-12 flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500 bg-opacity-20"></div>
            <div className="relative z-10">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Welcome Back
              </h2>
              <h1
                className="text-5xl font-bold mb-6"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Hello Developer,
              </h1>
              <p
                className="text-xl opacity-90"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Sign In To Get Started
              </p>
            </div>

            <div className="relative z-10">
              <p
                className="text-lg mb-4 opacity-90"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Our Social Media
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer group">
                  <FaInstagram className="w-5 h-5 text-gray-900 group-hover:text-red-500 group-hover:rotate-12 group-hover:scale-115 duration-300 ease-in-out" />
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer group">
                  <FaFacebook className="w-5 h-5 text-gray-900 group-hover:text-red-500 group-hover:rotate-12 group-hover:scale-115 duration-300 ease-in-out" />
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer group">
                  <FaTwitter className="w-5 h-5 text-gray-900 group-hover:text-red-500 group-hover:rotate-12 group-hover:scale-115 duration-300 ease-in-out" />
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer group">
                  <FaGithub className="w-5 h-5 text-gray-900 group-hover:text-red-500 group-hover:rotate-12 group-hover:scale-115 duration-300 ease-in-out" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Unbounded, sans-serif" }}
                >
                  Welcome Back 👋
                </h2>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Please enter your details.
                </p>
              </div>

              <div className="space-y-6">
                {/* Apple Sign In Button */}
                {appleLogin && (
                  <button
                    onClick={handleAppleSignIn}
                    className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Sign in with Apple
                  </button>
                )}
                {/* Divider */}
                {appleLogin && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span
                        className="px-4 bg-white text-gray-500"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        or
                      </span>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="user@email.com"
                      value={formData.email}
                      onChange={(e) => handleOnChange(e)}
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400/60 transition-all duration-200"
                      name="email"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>

                  {/* Password Input */}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      name="password"
                      onChange={(e) => handleOnChange(e)}
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-xl focus:outline-none text-gray-900 focus:ring-2 focus:ring-blue-500
                  placeholder-gray-400/60 focus:border-transparent transition-all duration-200"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </span>
                  </div>

                  {/* Forgot Password */}

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Login
                  </button>
                  <div>
                    {error && <p className="text-red-500">{error.message}</p>}
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Don't have an account?{" "}
                      <Link
                        to="/sign-up"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// <div className="flex flex-col mt-6 gap-4 items-center justify-center">
//   <h1>Supabase Login</h1>
//   <form onSubmit={handleSubmit}>
//     <div className="flex flex-col gap-2">
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         onChange={(e) => handleOnChange(e)}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={(e) => handleOnChange(e)}
//       />
//       <button className="bg-gray-500 cursor-pointer text-white p-2 rounded hover:bg-gray-600">
//         Login
//       </button>
//       <p>
//         Don't have an account?{" "}
//         <Link
//           to="/sign-up"
//           className="text-blue-500 underline hover:text-blue-900"
//         >
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   </form>
//   <div>{error && <p className="text-red-500">{error.message}</p>}</div>
// </div>
export default Login;
