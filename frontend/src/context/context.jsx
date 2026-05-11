import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import instance from "../service/axios";
import { toast } from "react-toastify";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (!isExpired) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return {
        username: decoded.username,
        email: decoded.email,
        pictureUrl: decoded.pictureUrl,
        role: decoded.role,
      };
    } else {
      localStorage.removeItem("token");
      return null;
    }
  } catch (err) {
    console.error("Token decoding failed:", err);
    localStorage.removeItem("token");
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken);

  // Set auto-logout timer on mount if user exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const timeLeft = decoded.exp * 1000 - Date.now();
        if (timeLeft > 0) {
          const timer = setTimeout(() => {
            logout();
            toast.info("Session expired. Please login again.");
          }, timeLeft);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Timer setup failed:", err);
      }
    }
  }, []);

  const login = ({ token, username, email, pictureUrl, role }) => {
    localStorage.setItem("token", token);
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser({ username, email, pictureUrl, role });

    const { exp } = jwtDecode(token);
    const expiryTime = exp * 1000 - Date.now();
    setTimeout(() => {
      logout();
      toast.info("Session expired. Please login again.");
    }, expiryTime);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);