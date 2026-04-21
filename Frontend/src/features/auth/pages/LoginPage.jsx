import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import "../styles/AuthForm.scss";
import useAuth from "../Hooks/useAuth";
import { setLoading, setError } from "../authSlice/auth.slice";
import ContinewWithGoogle from "../components/ContinewWithGoogle";


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useAuth();

  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ NEW

  // ✅ Page mount → error clear
  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  // ✅ Auto hide error after 5 sec
  useEffect(() => {
    if (error && isSubmitted) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, isSubmitted, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // realtime error clear
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSwitch = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitted(true); // ✅ IMPORTANT

    setFieldErrors({});
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      // ✅ Validation Errors
      if (err?.detail && Array.isArray(err.detail)) {
        const errors = {};

        err.detail.forEach((item) => {
          const field = item.path;
          if (!errors[field]) errors[field] = [];
          errors[field].push(item.msg);
        });

        setFieldErrors(errors);
        return;
      }

      // ✅ General Error
      if (err?.message) {
        dispatch(setError({ message: err.message }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-page">

      <div
        className="visual-side"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070')",
        }}
      >
        <div className="visual-content">
          <p>Exclusive Access</p>
          <h2>Welcome Back</h2>
        </div>
      </div>

      <div className="form-side">
        <div className="auth-container">
          <h1 className="brand">LUXELAYER</h1>

          <ContinewWithGoogle/>

          <div className="divider">OR</div>

          <form className="premium-form" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="field">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                className={fieldErrors.email ? "error-input" : ""}
              />
              {Array.isArray(fieldErrors.email) &&
                fieldErrors.email.map((err, i) => (
                  <span key={i} className="field-error">
                    {err}
                  </span>
                ))}
            </div>

            {/* PASSWORD */}
            <div className="field">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={formData.password}
                  className={fieldErrors.password ? "error-input" : ""}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {Array.isArray(fieldErrors.password) &&
                fieldErrors.password.map((err, i) => (
                  <span key={i} className="field-error">
                    {err}
                  </span>
                ))}
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "AUTHENTICATING..." : "LOG IN"}
            </button>
          </form>

          <div className="redirect-section">
            New to LuxeLayer? <span onClick={handleSwitch}>REGISTER</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
