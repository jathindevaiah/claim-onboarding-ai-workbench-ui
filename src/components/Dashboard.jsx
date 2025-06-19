import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  // Static data for the top stats
  const stats = [
    { label: "Total Clients Onboarded", value: 25 },
    { label: "Total Claims Onboarded (till date)", value: 200 },
    { label: "Average time taken to onboard a client", value: "45 Days" },
  ];

  // Data for the average time per step chart
  const chartData = {
    labels: ["Ingest to Map", "Ingest to Develop ETL", "Ingest to Validate", "Ingest to Load"],
    datasets: [
      {
        label: "Average Time (Days)",
        data: [10, 15, 12, 8], // Example data
        backgroundColor: "#4e73df",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Average Time Taken for Each Step" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Days" } },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: 24,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: "#23395d" }}>{stat.value}</div>
            <div style={{ fontSize: 16, color: "#555" }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 8, padding: 24 }}>
        <Bar key={JSON.stringify(chartData)} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
