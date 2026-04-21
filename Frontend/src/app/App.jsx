import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import useAuth from "../features/auth/Hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import LoadingLoder from "../features/dashboard/components/LoadingLoder";
import useSeller from "../features/dashboard/Hooks/useSeller";

const App = () => {
  const { fetchMe } = useAuth();
  const { handleGetSellerDetail } = useSeller();
  const { loading } = useSelector((state) => state.auth);

  const [isAuthChecked, setIsAuthChecked] = useState(false); // ✅ NEW
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchMe();
      } catch (err) {
        console.log("Auth failed", err);
      } finally {
        setIsAuthChecked(true);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!user) return; // ❗ important

    const fetchSeller = async () => {
      try {
        await handleGetSellerDetail();
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeller();
  }, [user]); // ✅ dependency add

  // ✅ jab tak auth check nahi hota → loader
  if (!isAuthChecked) {
    return (
      <div className="global-loader">
        <LoadingLoder />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      {loading && (
        <div className="global-loader">
          <LoadingLoder />
        </div>
      )}
      <Toaster
        position="top-right"
        gutter={0} // Sharp edge ke liye gutter kam rakhein
        toastOptions={{
          duration: 2000,
          // Custom class for Shine effect
          className: "premium-shine-toast",
          style: {
            borderRadius: "0px", // No rounding
            background: "#000000",
            color: "#fff",
            padding: "20px 30px",
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase", // Industrial look
            borderLeft: "4px solid #fff", // Accent line
            boxShadow: "5px 5px 10px rgba(0,0,0,0.9)",
            maxWidth: "500px",
            overflow: "hidden", // Shine animation ko container ke andar rakhne ke liye
          },
        }}
      />
    </>
  );
};

export default App;
