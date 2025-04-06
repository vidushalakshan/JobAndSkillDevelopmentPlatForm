import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = ({ onClose }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");

  const handleCodeChange = (index, value) => {
    if (value === "" || /^[0-9]$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus to next input
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/verify",
        {
          email,
          verificationCode: verificationCode.join("")
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Verification successful!");
        navigate("/login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Verify Email
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {email
            ? `Enter the 6-digit code we sent to ${email}`
            : "Enter the 6-digit code we sent to your email"}
        </p>

        <form className="space-y-4" onSubmit={handleVerify}>
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength={1}
                className="w-10 h-12 text-center text-lg rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={verificationCode[index]}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
                    document.getElementById(`code-input-${index - 1}`)?.focus();
                  }
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading || verificationCode.some(digit => digit === "")}
          >
            {loading ? "Loading..." : "Verify Code"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Didn't receive a code?{" "}
          <button 
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => alert("Resend functionality would go here")}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;