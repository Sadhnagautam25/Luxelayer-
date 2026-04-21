import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Congrats.scss";

const CongratsPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/seller-account");
  };

  return (
    <div className="congrats-container">
      <div className="congrats-card">
        <div className="checkmark">✔</div>

        <h1>Congratulations!</h1>

        <p className="message">
          Your business account has been successfully created.
        </p>

        <p className="sub-message">
          You can now manage your brand, add products, and reach customers
          worldwide.
        </p>

        <button onClick={handleRedirect} className="go-dashboard-btn">
          Go to My Account
        </button>
      </div>
    </div>
  );
};

export default CongratsPage;
