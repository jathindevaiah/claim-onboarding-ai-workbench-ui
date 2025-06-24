import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFolder, FaFile } from "react-icons/fa";

const ProjectsPane = ({ projects, selectedProject, onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        width: collapsed ? 40 : 260,
        transition: "width 0.2s",
        background: "#23395d",
        color: "#fff",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Toggle Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "8px 8px 0 0",
          cursor: "pointer",
        }}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
      {!collapsed && (
        <div>
          <h4 style={{ marginLeft: "20px" }}>Projects</h4>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {projects.map((project) => (
              <li key={project.name}>
                <div
                  style={{
                    cursor: "pointer",
                    fontWeight: selectedProject === project.name ? "bold" : "normal",
                    background: selectedProject === project.name ? "#f0f4ff" : "transparent",
                    padding: "20px 20px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.25rem",
                  }}
                  onClick={() => onSelect(project.name)}
                >
                  <FaFolder style={{ marginRight: 12, fontSize: "1.5em" }} />
                  {project.name}
                </div>
                {selectedProject === project.name && (
                  <ul style={{ listStyle: "none", paddingLeft: "40px" }}>
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
        </div>
      )}
    </div>
  );
};

export default ProjectsPane;
