import react from "react";

const user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

const token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

export const initailState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};


export const AuthReducer = (initailState, action) =>{
    switch (action.type) {
        case "REQUEST_LOGIN":
          return {
            ...initialState,
            loading: true
          };
          case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false
      };
}