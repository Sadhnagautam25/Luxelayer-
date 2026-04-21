import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingLoader from "../../dashboard/components/LoadingLoder";

export const SellerProtected = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // loading state
  if (loading) {
    return (
      <div className="global-loader">
        <LoadingLoader />
      </div>
    );
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role check (IMPORTANT PART)
  if (user.role !== "seller") {
    return <Navigate to="/" replace />; // ya "unauthorized page"
  }

  return children;
};

export default SellerProtected;
