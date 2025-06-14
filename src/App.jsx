// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import FileModal from "./components/FileModal";
import MappingTable from "./components/MappingTable";
import SpinnerOverlay from "./components/SpinnerOverlay";
import axios from "axios";
import { saveAs } from "file-saver";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitFiles = async (sourceFile, targetFile) => {
    const formData = new FormData();
    formData.append("source", sourceFile);
    formData.append("target", targetFile);

    setLoading(true);
    try {
      const response = await axios.post("/api/mapping", formData);
      setMappingData(response.data.mapping.data);
      setShowModal(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error while fetching mapping.");
    }
    setLoading(false);
  };

  const handleSaveMapping = (editedData) => {
    const payload = {
      success: true,
      mapping: {
        success: true,
        data: editedData,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    saveAs(blob, "mapping.json");
  };

  return (
    <div className="container mt-5">
      <Header />

      {!mappingData && (
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-primary btn-lg px-5 py-3"
            style={{ fontSize: "1.5rem", maxWidth: "400px", width: "100%" }}
            onClick={() => setShowModal(true)}
          >
            Start Onboarding
          </button>
        </div>
      )}

      {mappingData && <MappingTable data={mappingData} onSave={handleSaveMapping} />}

      <FileModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmitFiles} />
      <SpinnerOverlay show={loading} />
    </div>
  );
};

export default App;
