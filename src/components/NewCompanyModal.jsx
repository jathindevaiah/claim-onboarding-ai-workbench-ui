import React, { useState } from "react";

const NewCompanyModal = ({ show, onClose, onSubmit }) => {
  const [companyName, setCompanyName] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyName.trim()) {
      onSubmit(companyName.trim());
      setCompanyName("");
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
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
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h5>Add New Company</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            autoFocus
          />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCompanyModal;
