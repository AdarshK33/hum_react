import React from "react";

const LoaderIcon = () => {
  return (
    <div className="loader-box loader" style={{ width: "100% !important" }}>
      <div className="loader">
        <div className="line bg-primary"></div>
        <div className="line bg-primary"></div>
        <div className="line bg-primary"></div>
        <div className="line bg-primary"></div>
      </div>
    </div>
  );
};

export default LoaderIcon;
