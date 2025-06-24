import React from "react";

const MetricWidget = ({ title, metrics }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: 16,
      marginBottom: 16,
      minWidth: 0,
    }}
  >
    <div
      style={{
        fontWeight: "bold",
        textDecoration: "underline",
        fontSize: 16,
        marginBottom: 10,
        color: "#23395d",
        letterSpacing: 1,
      }}
    >
      {title}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {metrics.map((m, idx) => {
        const percent = m.total > 0 ? Math.round((m.value / m.total) * 100) : 0;
        return (
          <div key={idx} style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 500 }}>
              <span style={{ minWidth: 36, fontWeight: "bold", color: "#4e73df" }}>{m.value}</span>
              <span>
                out of <b>{m.total}</b> mapped
              </span>
              <span style={{ marginLeft: "auto", fontSize: 13, color: "#888" }}>{percent}%</span>
            </div>
            <div
              style={{
                background: "#e3eafc",
                borderRadius: 8,
                height: 12,
                marginTop: 6,
                width: "100%",
                overflow: "hidden",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: percent === 100 ? "#1cc88a" : "#4e73df",
                  borderRadius: 8,
                  transition: "width 0.4s",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default MetricWidget;
