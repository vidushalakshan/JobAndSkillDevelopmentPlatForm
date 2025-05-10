import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import instance from "../service/axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setUser({
            username: decoded.username || decoded.name || decoded.email?.split("@")[0],
            email: decoded.email,
            role: decoded.role,
          });

          const timeLeft = decoded.exp * 1000 - Date.now();
          setTimeout(() => {
            logout();
            toast.info("Session expired. Please login again.");
          }, timeLeft);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
        logout();
      }
    }
  }, []);

  const login = ({ token, username, email }) => {
    localStorage.setItem("token", token);
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const decoded = jwtDecode(token);
    setUser({
      username,
      email,
      role: decoded.role, 
    });

    const expiryTime = decoded.exp * 1000 - Date.now();
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

export  const useUser = () => useContext(UserContext);