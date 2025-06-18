// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import FileModal from "./components/FileModal";
import MappingTable from "./components/MappingTable";
import SpinnerOverlay from "./components/SpinnerOverlay";
import axios from "axios";
import { saveAs } from "file-saver";
import Footer from "./components/Footer";
import ProjectsPane from "./components/ProjectsPane";
import NewProjectModal from "./components/NewProjectModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const handleSubmitFiles = async (sourceFile, targetFile) => {
    const formData = new FormData();
    formData.append("source", sourceFile);
    formData.append("target", targetFile);

    setLoading(true);
    try {
      const response = await axios.post("/api/mapping", formData);
      setMappingData(response.data.mapping.data);
      setShowModal(false);

      if (selectedProject) {
        handleAddFilesToProject(selectedProject, [sourceFile.name, targetFile.name]);
      }

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
    saveAs(blob, `${selectedProject}_mapping.json`);

    // Add mapping.json to project
    if (selectedProject) {
      handleAddMappingFile(selectedProject, `${selectedProject}_mapping.json`);
    }
  };

  const handleCreateProject = (projectName) => {
    if (!projectName || projects.some((p) => p.name === projectName)) return;
    setProjects([...projects, { name: projectName, files: [] }]);
    // setSelectedProject(projectName);
    setShowNewProjectModal(false); // Close modal after creating project
  };

  const handleSelectProject = (projectName) => {
    setSelectedProject(projectName);
    setMappingData(null); // Reset mapping when switching projects
  };

  const handleAddFilesToProject = (projectName, fileNames) => {
    setProjects((projects) => projects.map((p) => (p.name === projectName ? { ...p, files: [...p.files, ...fileNames] } : p)));
  };

  const handleAddMappingFile = (projectName, fileName) => {
    setProjects((projects) =>
      projects.map((p) => (p.name === projectName && !p.files.includes(fileName) ? { ...p, files: [...p.files, fileName] } : p))
    );
  };

  // return (
  //   <div>
  //     <Header />
  //     <main
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         paddingTop: "100px",
  //         paddingLeft: "20px",
  //         paddingRight: "20px",
  //         flex: 1,
  //       }}
  //     >
  //       <h1 className="text-center mb-4">Data Mapping Tool</h1>
  //       <p className="text-center mb-4">
  //         Upload your source and target files to generate a mapping. You can then edit the mapping and download it as a JSON file.
  //       </p>
  //       <p className="text-center mb-4">Supported file formats: CSV, JSON, Excel (XLSX). Ensure the files are well-formed for accurate mapping.</p>
  //       <div className="d-flex justify-content-center align-items-center">
  //         {!mappingData && (
  //           <button
  //             className="btn btn-primary btn-lg px-5 py-3"
  //             style={{ fontSize: "1.5rem", maxWidth: "400px", width: "100%" }}
  //             onClick={() => setShowModal(true)}
  //           >
  //             Start Onboarding
  //           </button>
  //         )}
  //       </div>

  //       {mappingData && <MappingTable data={mappingData} onSave={handleSaveMapping} />}
  //     </main>

  //     <FileModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmitFiles} />
  //     <SpinnerOverlay show={loading} />
  //     <Footer />
  //   </div>
  // );

  // ...existing code...
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Pane */}
      <div
        style={{
          width: "260px",
          borderRight: "1px solid #eee",
          padding: "20px 0",
          // background: "#23395d", // Accessible dark blue
          // color: "#fff", // White text for contrast
          minHeight: "100vh",
        }}
      >
        <ProjectsPane projects={projects} selectedProject={selectedProject} onSelect={handleSelectProject} />
        <button className="btn btn-outline-primary mt-3" style={{ width: "90%", marginLeft: "5%" }} onClick={() => setShowNewProjectModal(true)}>
          + New Project
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f0f4ff", minHeight: "100vh" }}>
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
          {!selectedProject && (
            <>
              <h1 className="text-center mb-4">Data Mapping Tool</h1>
              <p className="text-center mb-4">
                Upload your source and target files to generate a mapping. You can then edit the mapping and download it as a JSON file.
              </p>
              <p className="text-center mb-4">
                Supported file formats: CSV, JSON, Excel (XLSX). Ensure the files are well-formed for accurate mapping.
              </p>
            </>
          )}
          {selectedProject && (
            <>
              <h1 className="text-center mb-4">{selectedProject}</h1>
            </>
          )}
          <div className="d-flex justify-content-center align-items-center">
            {!mappingData && selectedProject && (
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

      {/* New Project Modal */}
      <NewProjectModal show={showNewProjectModal} onClose={() => setShowNewProjectModal(false)} onSubmit={handleCreateProject} />
    </div>
  );
};

export default App;
``;
