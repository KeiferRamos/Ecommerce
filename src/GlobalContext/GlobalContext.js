import React, { createContext, useContext, useEffect, useState } from "react";

const EcommerceContext = createContext([]);

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const getWidth = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [width]);

  const [users, setUsers] = useState(() => {
    let usersData = localStorage.getItem("usersData");
    return usersData ? JSON.parse(usersData) : [];
  });
  const [activeUser, setActiveUser] = useState(() => {
    let activeData = localStorage.getItem("activeData");
    return activeData ? JSON.parse(activeData) : {};
  });

  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(users));
    localStorage.setItem("activeData", JSON.stringify(activeUser));
  }, [users, activeUser]);
  return (
    <EcommerceContext.Provider
      value={{
        users,
        setUsers,
        activeUser,
        setActiveUser,
        width,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}

export const UseGlobalContext = () => useContext(EcommerceContext);
