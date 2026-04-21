import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import "../styles/VerifyPage.scss";
import useAuth from "../Hooks/useAuth";
motion;

const VerifyPage = () => {
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [searchParams] = useSearchParams();

  const { resendVerificationMail } = useAuth();

  const startCooldown = () => {
    setCooldown(30);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    try {
      setResending(true);

      // email tumhe pass karni hogi (state / localStorage / redux se)
      const email = localStorage.getItem("email"); // example

      await resendVerificationMail(email);

      setSent(true);

      // ✅ SUCCESS TOAST
      toast.success("A new verification link has been sent");
      // success message hide after 5 sec
      setTimeout(() => setSent(false), 5000);

      // 🔒 disable button for 30 sec
      startCooldown();
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to resend email");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    const expired = searchParams.get("expired");
    const invalid = searchParams.get("invalid");
    const verified = searchParams.get("verified");

    if (expired === "true") {
      toast.error("Your verification link has expired. Please resend.");
    }

    if (invalid === "true") {
      toast.error("Invalid verification link.");
    }

    if (verified === "true") {
      toast.success("Email verified successfully. Please login.");
    }
  }, []);

  return (
    <div className="verify-container">
      {/* Left Visual Side */}
      <div className="visual-section" />

      {/* Right Content Side */}
      <div className="content-section">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="brand-logo">LuxeLayer</div>

          <div className="text-group">
            <h1>
              Secure your <span>Identity.</span>
            </h1>
            <p>
              We have dispatched a verification link to your registered email
              address. Kindly authenticate to gain entry to your exclusive
              dashboard.
            </p>
          </div>

          <div className="button-group">
            {/* Main Action: Go to Login (since they need to verify first) */}
            <button
              className="btn-primary"
              onClick={() => (window.location.href = "/login")}
            >
              RETURN TO LOGIN
            </button>

            {/* Resend Action */}
            <button
              className="btn-secondary"
              onClick={handleResend}
              disabled={resending || cooldown > 0}
            >
              {resending
                ? "DISPATCHING..."
                : cooldown > 0
                  ? `RESEND IN ${cooldown}s`
                  : "RESEND INVITATION"}
            </button>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="success-note"
                >
                  New link sent successfully.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyPage;
