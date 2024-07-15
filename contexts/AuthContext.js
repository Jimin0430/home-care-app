import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, handleSignIn }) {
  return (
    <AuthContext.Provider value={{ handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
