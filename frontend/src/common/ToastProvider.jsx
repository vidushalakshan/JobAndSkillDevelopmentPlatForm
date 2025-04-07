import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
        toastStyle={{
          backgroundColor: "#f8f9fa", 
          color: "#212529", 
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        progressStyle={{
          background: "linear-gradient(to right, #4a6cf7, #2541b2)", 
        }}
      />
    </>
  );
};

export default ToastProvider;
