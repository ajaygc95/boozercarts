import React, { createContext, useContext } from "react";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
      throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context;
  }
   
  export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
      throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
   
    return context;
  }
