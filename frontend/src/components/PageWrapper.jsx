import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div
      className="w-full min-h-screen relative"
      style={{ backgroundColor: "#00291e", boxSizing: "border-box" }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
