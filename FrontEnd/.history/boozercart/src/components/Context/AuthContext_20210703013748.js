import React, { createContext, useContext } from "react";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("UseAuthState must be used within a AuthProvider");
  }
}
