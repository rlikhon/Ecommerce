import { createContext, useState } from "react";

export const AccountAuthContext = createContext();

export const AccountAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo && userInfo !== "undefined") {
      try {
        return JSON.parse(userInfo);
      } catch (e) {
        console.error("Local storage token extraction parse error:", e);
        return null;
      }
    }
    return null;
  });

  const login = (userInfoData) => {
    setUser(userInfoData);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AccountAuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AccountAuthContext.Provider>
  );
};
