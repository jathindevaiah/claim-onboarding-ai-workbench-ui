// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import FileModal from "./components/FileModal";
import MappingTable from "./components/MappingTable";
import SpinnerOverlay from "./components/SpinnerOverlay";
import axios from "axios";
import { saveAs } from "file-saver";
import Footer from "./components/Footer";

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
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px",
          paddingLeft: "20px",
          paddingRight: "20px",
          flex: 1,
        }}
      >
        <h1 className="text-center mb-4">Data Mapping Tool</h1>
        <p className="text-center mb-4">
          Upload your source and target files to generate a mapping. You can then edit the mapping and download it as a JSON file.
        </p>
        <p className="text-center mb-4">Supported file formats: CSV, JSON, Excel (XLSX). Ensure the files are well-formed for accurate mapping.</p>
        <div className="d-flex justify-content-center align-items-center">
          {!mappingData && (
            <button
              className="btn btn-primary btn-lg px-5 py-3"
              style={{ fontSize: "1.5rem", maxWidth: "400px", width: "100%" }}
              onClick={() => setShowModal(true)}
            >
              Start Onboarding
            </button>
          )}
        </div>

        {mappingData && <MappingTable data={mappingData} onSave={handleSaveMapping} />}
      </main>

      <FileModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmitFiles} />
      <SpinnerOverlay show={loading} />
      <Footer />
    </div>
  );
};

export default App;
``;
