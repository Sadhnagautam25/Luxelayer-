import React from 'react';
import '../styles/LoadingLoder.scss';

const LoadingLoader = () => {
  return (
    <div className="full-screen-container">
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingLoader;
