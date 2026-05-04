import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  //const token = localStorage.getItem("token");
  const adminInfo = localStorage.getItem("adminInfo");
  const [user, setUser] = useState(adminInfo ? JSON.parse(adminInfo) : null);

  const login = (adminInfo) => {
    setUser(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminInfo");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
