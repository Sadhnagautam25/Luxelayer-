import React from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard/styles/NotFoundPage.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="not-found-wrapper">
      <div className="container">
        <header className="brand-header">
          <h1 className="logo">LUXELAYER</h1>
        </header>

        <section className="error-content">
          <span className="error-badge">Error 404</span>
          <h2 className="title">Lost in Style</h2>
          <p className="description">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="action-group">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Sign In to Account
            </button>
            <button className="btn-secondary" onClick={() => navigate("/")}>
              Back to Collection
            </button>
          </div>
        </section>

        <footer className="footer-minimal">
          &copy; {new Date().getFullYear()} LUXELAYER. All Rights Reserved.
        </footer>
      </div>
    </main>
  );
};

export default NotFoundPage;
