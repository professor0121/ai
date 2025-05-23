import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: Custom hook to use context
export const useUser = () => useContext(UserContext);
