import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LendingPage.scss";

const images = [
  "https://images.unsplash.com/photo-1727107047534-99afc152baf7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=3020",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
];

const LendingPage = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000); // 5 Seconds interval
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="exclusive-entry">
      {/* Dynamic Background Slider */}
      <div className="slider-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === currentImg ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="cinematic-overlay"></div>
      </div>

      <div className="main-interface">
        <header className="reveal-text">
          <span className="eyebrow">A NEW ERA OF COUTURE</span>
          <h1 className="logo-text">LUXELAYER</h1>
          <div className="accent-bar"></div>
        </header>

        <section className="interaction-vault">
          <p className="manifesto">
            Experience the harmony of architectural precision <br /> 
            and timeless elegance.
          </p>
          
          <div className="button-cluster">
            <button className="luxe-btn main" onClick={() => navigate("/register")}>
              <span className="btn-text">EXPLORE COLLECTION</span>
              <span className="btn-hover-bg"></span>
            </button>
            
            <button className="luxe-btn ghost" onClick={() => navigate("/login")}>
              MEMBER ACCESS
            </button>
          </div>
        </section>

        <div className="scroll-indicator">
          <div className="line"></div>
          <span>SCROLL TO DISCOVER</span>
        </div>
      </div>
    </div>
  );
};

export default LendingPage;
