import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
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
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
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
      const errorMessage = setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sign up
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* {error && (
                <Typography
                    variant="subtitle2"
                    color = "error"
                    align="center"
                    sx={{ mt: 1}}
                >
                    {error}
                </Typography>
            )} */}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="USER">User</option>
            <option value="LECTURER">Lecturer</option>
            <option value="EMPLOYER">Employer</option>
            <option value="TRAINER">Trainer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            {loading ? "Loading..." : " Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
            onClick={handleNavigateToLogin}
          >
            Log in
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
