import React from "react";

const MappingSubmittedModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #eee" }}>
          <span style={{ fontWeight: 600, fontSize: 18 }}>Mapping Submitted</span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#888",
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div style={{ padding: "24px", textAlign: "center" }}>
          <button className="btn btn-primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MappingSubmittedModal;
