import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import instance from "../service/axios";
import { useUser } from "../context/context";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields..");
      setLoading(false);
      return;
    }

    try {
      const response = await instance.post("auth/login", formData);
    
      if (!response.data || !response.data.token) {
        throw new Error("No token received");
      }
    
      localStorage.setItem("token", response.data.token);
      instance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    
      login({
        token: response.data.token, 
        username: response.data.username || formData.email.split("@")[0],
        email: formData.email,
      });
    
      toast.success("Login Successful!");
      setTimeout(() => navigate("/"), 1500);
    
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please try again."
      );
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
        toast.success("Google Login Successful!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] relative overflow-hidden px-4">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Log in to your professional portal</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
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

          <div className="flex justify-end">
            <button type="button" className="text-sm text-blue-500 hover:underline">Forgot password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
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
            useOneTap
            shape="pill"
            theme="filled_blue"
            width="100%"
          />
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            className="text-blue-500 hover:underline font-bold"
            onClick={handleNavigateToSignup}
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;