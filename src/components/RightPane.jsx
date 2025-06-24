import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MetricWidget from "./MetricWidget";

const RightPane = ({ show, showMappingMetrics }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (!show) return null;

  return (
    <div
      style={{
        width: collapsed ? 40 : 320,
        transition: "width 0.2s",
        background: "#f7f9fa",
        borderLeft: "1px solid #ddd",
        height: "84.5vh",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
        marginTop: "85px",
      }}
    >
      {/* Toggle Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "8px 8px 0 0",
          cursor: "pointer",
        }}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? <FaChevronLeft /> : <FaChevronRight />}
      </div>
      {!collapsed && (
        <div style={{ padding: "16px" }}>
          {/* Upper Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <button className="btn btn-outline-primary mb-2">Upload Claim file</button>
            <button className="btn btn-outline-secondary mb-2">Generate File</button>
            <button className="btn btn-outline-success mb-2">Validate</button>
          </div>
          <hr />
          {/* Bottom Section - Metrics */}
          {showMappingMetrics && (
            <div>
              {/* <div style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: 8 }}>ECOS DC</div>
              <div style={{ marginBottom: 4 }}>35 out of 40 mapped</div>
              <div style={{ marginBottom: 12 }}>80 out of 100 mapped</div>
              <div style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: 8 }}>Sedgwick</div>
              <div style={{ marginBottom: 4 }}>40 out of 40 mapped</div>
              <div>86 out of 100 mapped</div> */}
              <MetricWidget title="ECOS DC" metrics={[{ value: 16, total: 40 }]} />
              <MetricWidget title="Sedgwick" metrics={[{ value: 16, total: 16 }]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightPane;
