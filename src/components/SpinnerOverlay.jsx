// src/components/SpinnerOverlay.jsx
import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed w-100 h-100 top-0 start-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <Spinner animation="border" role="status" variant="light" />
    </div>
  );
};

export default SpinnerOverlay;
