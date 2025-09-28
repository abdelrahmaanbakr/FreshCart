import React, { useContext } from "react";
import { Navigate } from "react-router";
import { TokenContext } from "../Context/Token.context";

export default function ProtectedRoute({ children }) {
const { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
