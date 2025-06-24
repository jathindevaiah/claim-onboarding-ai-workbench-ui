import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const overallData = {
  labels: ["Mapping", "Develop ETL", "Validate", "Load"],
  datasets: [
    {
      data: [10, 15, 12, 8],
      backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
      borderWidth: 2,
    },
  ],
};

const sunocoData = {
  labels: overallData.labels,
  datasets: [
    {
      data: [8, 14, 10, 7],
      backgroundColor: overallData.datasets[0].backgroundColor,
      borderWidth: 2,
    },
  ],
};

const sedwickData = {
  labels: overallData.labels,
  datasets: [
    {
      data: [12, 13, 14, 9],
      backgroundColor: overallData.datasets[0].backgroundColor,
      borderWidth: 2,
    },
  ],
};

const donutOptions = {
  cutout: "60%",
  plugins: {
    legend: { display: true, position: "bottom" },
    tooltip: { enabled: true },
  },
};

const AverageTimeDial = ({ days }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(days / 60, 1);
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg height={radius * 2} width={radius * 2}>
        <circle stroke="#e6e6e6" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
        <circle
          stroke="#4e73df"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="2.5em" fill="#23395d" fontWeight="bold">
          {days}
        </text>
      </svg>
      <div style={{ marginTop: 8, fontSize: 16, color: "#555" }}>Avg. Onboarding Time</div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div style={{ width: "100%", maxWidth: 1400, margin: "100 auto" }}>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50, fontWeight: 700, color: "#23395d" }}>3</div>
          <div style={{ fontSize: 16, color: "#555" }}>Total Clients Onboarded</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50, fontWeight: 700, color: "#23395d" }}>2800</div>
          <div style={{ fontSize: 16, color: "#555" }}>Total Claims Onboarded (till date)</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: 24,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AverageTimeDial days={45} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", justifyContent: "center" }}>
        <div style={{ flex: 2, background: "#fff", borderRadius: 8, padding: 24, minWidth: 200 }}>
          <div style={{ textAlign: "center", fontWeight: 600, marginBottom: 8 }}>Overall Average Time Per Step</div>
          <div style={{ width: 300, height: 300, margin: "0 auto" }}>
            <Doughnut data={overallData} options={donutOptions} width={200} height={200} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 16, minWidth: 180 }}>
            <div style={{ textAlign: "center", fontWeight: 600, marginBottom: 8 }}>Sunoco</div>
            <div style={{ width: 200, height: 200, margin: "0 auto" }}>
              <Doughnut data={sunocoData} options={donutOptions} width={100} height={100} />
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 16, minWidth: 180 }}>
            <div style={{ textAlign: "center", fontWeight: 600, marginBottom: 8 }}>Sedwick</div>
            <div style={{ width: 200, height: 200, margin: "0 auto" }}>
              <Doughnut data={sedwickData} options={donutOptions} width={100} height={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
