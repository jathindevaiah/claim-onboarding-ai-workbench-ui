import { FaCheckCircle } from "react-icons/fa";

const steps = [
  { key: "upload", label: "Upload files" },
  { key: "mappingGenerated", label: "Mapping Generated" },
  { key: "mappingSaved", label: "Mapping Saved" },
  { key: "etlCompleted", label: "ETL Completed" },
  { key: "onboardingComplete", label: "Onboarding complete" },
];

const OnboardingProgress = ({ progress }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
    {steps.map((step, idx) => (
      <div key={step.key} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: progress[step.key] ? "#28a745" : "#bbb",
            fontWeight: progress[step.key] ? "bold" : "normal",
            fontSize: 18,
          }}
        >
          {progress[step.key] ? (
            <FaCheckCircle style={{ marginRight: 8 }} />
          ) : (
            <span
              style={{
                display: "inline-block",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "2px solid #bbb",
                marginRight: 8,
                background: "#fff",
              }}
            />
          )}
          {step.label}
        </div>
        {idx < steps.length - 1 && (
          <div
            style={{
              width: 40,
              height: 2,
              background: progress[steps[idx + 1].key] ? "#28a745" : "#bbb",
              margin: "0 12px",
            }}
          />
        )}
      </div>
    ))}
  </div>
);

export default OnboardingProgress;
