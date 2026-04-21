import React from "react";
import "../styles/ContinewWithGoogle.scss";

const ContinewWithGoogle = () => {
  const handleGoogleLogin = () => {
    // backend route hit karega aur Google login page open hoga
    window.location.href = "/api/auth/google";
  };

  return (
    <button className="google-auth" type="button" onClick={handleGoogleLogin}>
      <div className="google-icon-wrapper">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
          alt="Google"
        />
      </div>
      <span>CONTINUE WITH GOOGLE</span>
    </button>
  );
};

export default ContinewWithGoogle;
