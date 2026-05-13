import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Navigate } from "react-router";
import Loading from "../Components/Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to={"/LogIn"}></Navigate>;
  }
  return children;
};

export default PrivateRouter;
