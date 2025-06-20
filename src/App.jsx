// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import FileModal from "./components/FileModal";
import MappingTable from "./components/MappingTable";
import SpinnerOverlay from "./components/SpinnerOverlay";
import axios from "axios";
import { saveAs } from "file-saver";
import Footer from "./components/Footer";
import CompaniesPane from "./components/CompaniesPane";
import NewProjectModal from "./components/NewProjectModal";
import NewCompanyModal from "./components/NewCompanyModal";
import MappingSubmittedModal from "./components/MappingSubmittedModal";
import Dashboard from "./components/Dashboard";
import OnboardingProgress from "./components/OnboardingProgress";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showMappingSubmittedModal, setShowMappingSubmittedModal] = useState(false);
  const [isMappingStarted, setIsMappingStarted] = useState(false);

  const [progress, setProgress] = useState({
    upload: false,
    mappingGenerated: false,
    mappingSaved: false,
    etlCompleted: false,
    onboardingComplete: false,
  });

  const handleCreateCompany = (companyName) => {
    if (!companyName || companies.some((c) => c.name === companyName)) return;
    setCompanies([...companies, { name: companyName, projects: [] }]);
  };

  const handleSelectCompany = (companyName) => {
    setSelectedCompany(companyName);
    setSelectedProject(null);
  };

  const handleCreateProject = (projectName) => {
    if (!projectName || !selectedCompany || companies.find((c) => c.name === selectedCompany).projects.some((p) => p.name === projectName)) return;
    setCompanies((companies) =>
      companies.map((c) => (c.name === selectedCompany ? { ...c, projects: [...c.projects, { name: projectName, files: [] }] } : c))
    );
  };

  const handleSelectProject = (companyName, projectName) => {
    setSelectedCompany(companyName);
    setSelectedProject(projectName);
    setMappingData(null);
  };

  const handleSubmitFiles = async (sourceFile, targetFile) => {
    setIsMappingStarted(true);
    setProgress((prev) => ({ ...prev, upload: true }));
    const formData = new FormData();
    formData.append("dataDictionary", sourceFile);
    formData.append("schemaFile", targetFile);

    setLoading(true);
    setShowModal(false);
    try {
      const response = await axios.post("http://localhost:3000/api/mapping", formData);
      setMappingData(response.data.mapping.data);
      setProgress((prev) => ({ ...prev, mappingGenerated: true }));

      // Add uploaded file names to the selected project under the selected company
      if (selectedCompany && selectedProject) {
        handleAddFilesToProject(selectedCompany, selectedProject, [sourceFile.name, targetFile.name]);
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

    // Add mapping.json to the selected project under the selected company
    if (selectedCompany && selectedProject) {
      handleAddMappingFile(selectedCompany, selectedProject, `${selectedProject}_mapping.json`);
    }
    setProgress((prev) => ({ ...prev, mappingSaved: true }));
  };

  const handleSubmitMapping = () => {
    // setProgress((prev) => ({ ...prev, etlCompleted: true }));
    // setTimeout(() => {
    //   setProgress((prev) => ({ ...prev, onboardingComplete: true }));
    // }, 5000);
    setShowMappingSubmittedModal(true);
  };

  const handleAddFilesToProject = (companyName, projectName, fileNames) => {
    setCompanies((companies) =>
      companies.map((company) =>
        company.name === companyName
          ? {
              ...company,
              projects: company.projects.map((project) =>
                project.name === projectName ? { ...project, files: [...project.files, ...fileNames] } : project
              ),
            }
          : company
      )
    );
  };

  const handleAddMappingFile = (companyName, projectName, fileName) => {
    setCompanies((companies) =>
      companies.map((company) =>
        company.name === companyName
          ? {
              ...company,
              projects: company.projects.map((project) =>
                project.name === projectName && !project.files.includes(fileName) ? { ...project, files: [...project.files, fileName] } : project
              ),
            }
          : company
      )
    );
  };

  const handleCloseMappingSubmittedModal = () => {
    setShowMappingSubmittedModal(false);
    setSelectedCompany(null);
    setSelectedProject(null);
    setMappingData(null);
    setProgress({
      upload: false,
      mappingGenerated: false,
      mappingSaved: false,
      etlCompleted: false,
      onboardingComplete: false,
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Pane */}
      <div
        style={{
          width: "260px",
          borderRight: "1px solid #eee",
          padding: "20px 0",
          // background: "#23395d",
          // color: "#fff",
          minHeight: "100vh",
        }}
      >
        <CompaniesPane
          companies={companies}
          selectedCompany={selectedCompany}
          selectedProject={selectedProject}
          onSelectCompany={handleSelectCompany}
          onSelectProject={handleSelectProject}
        />
        <button className="btn btn-outline-dark mt-3" style={{ width: "90%", marginLeft: "5%" }} onClick={() => setShowNewCompanyModal(true)}>
          + Add TPA
        </button>
      </div>
      <div style={{ flex: 1, background: "#f7f9fa" }}>
        <Header />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            paddingTop: "100px",
            flex: 1,
            // height: "80%",
          }}
        >
          {!selectedCompany && !selectedProject && (
            <div style={{ flex: 1, margin: "20px" }}>
              <Dashboard />
            </div>
          )}

          {selectedCompany && !selectedProject && (
            <>
              <h2 className="text-center mb-4">{selectedCompany}</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowNewProjectModal(true)}
                style={{
                  width: "25%",
                  alignSelf: "center",
                }}
              >
                + Add Client
              </button>
            </>
          )}
          {selectedCompany && selectedProject && (
            <>
              <OnboardingProgress progress={progress} />
              {/* <h1 className="text-center mb-4">{`${selectedProject} Claim Onboarding`}</h1>
            <div className="d-flex justify-content-center align-items-center">
              {!mappingData && (
            <button
              className="btn btn-primary"
              style={{ fontSize: "1.5rem", maxWidth: "400px", width: "100%" }}
              onClick={() => setShowModal(true)}
            >
              Start Onboarding
            </button>
              )}
            </div> */}
              {!isMappingStarted && (
                <>
                  <h1 className="text-center mb-4">{`${selectedProject} Claim Onboarding`}</h1>
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
                </>
              )}

              {mappingData && (
                <div className="text-center mb-4 mx-4">
                  <MappingTable data={mappingData} onSave={handleSaveMapping} onSubmit={handleSubmitMapping} progress={progress} />
                </div>
              )}
            </>
          )}
        </main>
        <FileModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmitFiles} />
        <SpinnerOverlay show={loading} />
        <Footer />
      </div>
      {/* Modals */}
      <NewCompanyModal show={showNewCompanyModal} onClose={() => setShowNewCompanyModal(false)} onSubmit={handleCreateCompany} />
      <NewProjectModal show={showNewProjectModal} onClose={() => setShowNewProjectModal(false)} onSubmit={handleCreateProject} />
      <MappingSubmittedModal show={showMappingSubmittedModal} onClose={handleCloseMappingSubmittedModal} />
    </div>
  );
};

export default App;
``;
