import React, { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("token") || null;
    const decode = token ? jwtDecode(token) : null;
    setUser(
      token
        ? {
            name: decode.username,
          }
        : null
    );
  }, []);

  const loginUser = (data) => {
    console.log(data);
    setUser(data);
  };
  const logoutUser = () => {
    cookies.remove("token");
    setUser(null);
  };

  const contextValues = {
    user,
    loginUser,
    logoutUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
