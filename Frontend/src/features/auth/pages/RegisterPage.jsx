import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import "../styles/AuthForm.scss";
import useAuth from "../Hooks/useAuth";
import { setLoading, setError } from "../authSlice/auth.slice";
import ContinewWithGoogle from "../components/ContinewWithGoogle";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerUser } = useAuth();

  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    FirstName: "",
    Lastname: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ NEW

  // ✅ Page mount → old error clear
  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  // ✅ Auto hide alert after 5 sec (only after submit)
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // realtime error clear
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSwitch = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true); // ✅ IMPORTANT

    setFieldErrors({});
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const data = await registerUser(formData);

      if (data) {
        localStorage.setItem("email", formData.email);
        navigate("/verify-email");
      }
    } catch (err) {
      console.log("ERROR:", err);

      // ✅ VALIDATION ERRORS (same logic, untouched)
      if (err?.detail && Array.isArray(err.detail)) {
        const errors = {};

        const fieldMap = {
          FirstName: "FirstName",
          Lastname: "Lastname",
          email: "email",
          password: "password",
        };

        err.detail.forEach((item) => {
          const field = fieldMap[item.path];
          const message = item.msg;

          if (field) {
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field].push(message);
          }
        });

        setFieldErrors(errors);
        return;
      }

      // ✅ GENERAL ERROR
      if (err?.message) {
        dispatch(setError({ message: err.message }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-page">

      <div className="visual-side">
        <div className="visual-content">
          <p>Spring / Summer 2026</p>
          <h2>The Art of Layering</h2>
        </div>
      </div>

      <div className="form-side">
        <div className="auth-container">
          <h1 className="brand">LUXELAYER</h1>

          <ContinewWithGoogle />

          <div className="divider">OR</div>

          <form className="premium-form" onSubmit={handleSubmit}>
            <div className="input-row">
              {/* FIRST NAME */}
              <div className="field">
                <label>First Name</label>
                <input
                  name="FirstName"
                  type="text"
                  onChange={handleChange}
                  value={formData.FirstName}
                  className={fieldErrors.FirstName ? "error-input" : ""}
                />
                {Array.isArray(fieldErrors.FirstName) &&
                  fieldErrors.FirstName.map((err, i) => (
                    <span key={i} className="field-error">
                      {err}
                    </span>
                  ))}
              </div>

              {/* LAST NAME */}
              <div className="field">
                <label>Last Name</label>
                <input
                  name="Lastname"
                  type="text"
                  onChange={handleChange}
                  value={formData.Lastname}
                  className={fieldErrors.Lastname ? "error-input" : ""}
                />
                {Array.isArray(fieldErrors.Lastname) &&
                  fieldErrors.Lastname.map((err, i) => (
                    <span key={i} className="field-error">
                      {err}
                    </span>
                  ))}
              </div>
            </div>

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
              {loading ? "PROCESSING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="redirect-section">
            Already a member? <span onClick={handleSwitch}>LOGIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
