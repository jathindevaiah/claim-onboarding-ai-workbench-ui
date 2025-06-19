import React from "react";

const SpinnerOverlay = ({ show }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div className="spinner-border text-primary" style={{ width: 60, height: 60, fontSize: 32 }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div style={{ marginTop: 24, fontSize: "1.25rem", color: "#23395d", fontWeight: "bold" }}>Creating mapping through AI magic!!</div>
    </div>
  );
};

export default SpinnerOverlay;
