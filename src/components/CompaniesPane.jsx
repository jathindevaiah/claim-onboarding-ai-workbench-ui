import React from "react";
import { FaFolder, FaFile } from "react-icons/fa";

const CompaniesPane = ({ companies, selectedCompany, selectedProject, onSelectCompany, onSelectProject }) => (
  <div>
    <h4 style={{ marginLeft: "20px" }}>Companies</h4>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {companies.map((company) => (
        <li key={company.name}>
          <div
            style={{
              cursor: "pointer",
              fontWeight: selectedCompany === company.name && !selectedProject ? "bold" : "normal",
              background: selectedCompany === company.name && !selectedProject ? "#e3eafc" : "transparent",
              padding: "10px 20px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
            onClick={() => onSelectCompany(company.name)}
          >
            <FaFolder style={{ marginRight: 12, fontSize: "1.5em" }} />
            {company.name}
          </div>
          {/* Show projects if this company is selected */}
          {selectedCompany === company.name && company.projects.length > 0 && (
            <ul style={{ listStyle: "none", paddingLeft: "40px" }}>
              {company.projects.map((project) => (
                <li key={project.name}>
                  <div
                    style={{
                      cursor: "pointer",
                      fontWeight: selectedProject === project.name ? "bold" : "normal",
                      background: selectedProject === project.name ? "#d1e7dd" : "transparent",
                      padding: "8px 10px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => onSelectProject(company.name, project.name)}
                  >
                    <FaFolder style={{ marginRight: 10, fontSize: "1.2em", color: "#4e73df" }} />
                    {project.name}
                  </div>
                  {/* Show files if this project is selected */}
                  {selectedProject === project.name && (
                    <ul style={{ listStyle: "none", paddingLeft: "32px" }}>
                      {project.files.map((file) => (
                        <li key={file} style={{ display: "flex", alignItems: "center", fontSize: "1rem", marginTop: "10px" }}>
                          <FaFile style={{ marginRight: 8, color: "#888" }} />
                          {file}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default CompaniesPane;
