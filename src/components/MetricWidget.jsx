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
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {metrics.map((m, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              background: m.value === m.total ? "#1cc88a" : "#4e73df",
              color: "#fff",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 16,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            {m.value}
          </div>
          <span>
            out of <b>{m.total}</b> mapped
          </span>
        </div>
      ))}
    </div>
  </div>
);
export default MetricWidget;
