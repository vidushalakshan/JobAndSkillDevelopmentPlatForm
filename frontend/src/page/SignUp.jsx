import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import instance from "../service/axios";

import { useUser } from "../context/context";
import { motion } from "framer-motion";
import { Button } from "../common/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await instance.post(
        "auth/signup",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Registration successful! Please check your email for verification."
        );
        setTimeout(() => {
          navigate("/verify", {
            state: {
              email: formData.email,
            },
          });
        }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await instance.post("auth/google", {
        idToken: credentialResponse.credential,
      });

      if (response.data.token) {
        login({
          token: response.data.token,
          username: response.data.username,
          email: response.data.email,
          pictureUrl: response.data.pictureUrl,
          role: response.data.role
        });
        toast.success("Google Sign Up Successful!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] relative overflow-hidden px-4">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400">Join the future of professional growth</p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="bgBlack"
            className="w-full"
            size="medium"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
            shape="pill"
            theme="filled_blue"
            width="320"
          />
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline font-bold"
            onClick={handleNavigateToLogin}
          >
            Log in
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
