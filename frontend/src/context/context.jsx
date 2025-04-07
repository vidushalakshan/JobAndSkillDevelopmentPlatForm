import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const login = (userData) => {
      setUser(userData);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUser = () => useContext(UserContext);