const EmailVerification = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verify Email</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
          </div>
  
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enter the 6-digit code we sent to your email.
          </p>
  
          <form className="space-y-4">
            <div className="flex justify-between gap-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
  
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Verify Code
            </button>
          </form>
  
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Didn’t receive a code? <button className="text-blue-600 hover:underline">Resend</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmailVerification;
  