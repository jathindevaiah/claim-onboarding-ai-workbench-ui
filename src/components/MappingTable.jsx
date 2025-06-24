// src/components/MappingTable.jsx
import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaPencilAlt, FaTimes, FaCheck } from "react-icons/fa";

const MappingTable = ({ data, onSave, onSubmit, progress }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState(data);

  const handleEdit = (index) => setEditingRow(index);

  const handleChange = (index, key, value) => {
    const newData = [...editedData];
    newData[index][key] = value;
    setEditedData(newData);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditedData(data);
    setEditingRow(null);
  };

  return (
    <>
      <div style={{ maxHeight: "600px", overflowY: editedData.length > 10 ? "auto" : "visible" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Destination Schema</th>
              <th>Source Schema</th>
              <th>Transformation Rule</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((row, index) => (
              <tr key={index}>
                <td>{row.targetField}</td>
                <td>
                  {editingRow === index ? (
                    <Form.Control value={row.sourceField} onChange={(e) => handleChange(index, "sourceField", e.target.value)} />
                  ) : (
                    row.sourceField
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <Form.Control
                      value={row.rules.join("; ")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "rules",
                          e.target.value.split(";").map((r) => r)
                          // e.target.value
                        )
                      }
                    />
                  ) : (
                    row.rules.join("; ")
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <>
                      <Button variant="success" size="sm" onClick={handleSave}>
                        <FaCheck />
                      </Button>{" "}
                      <Button variant="outline-danger" size="sm" onClick={handleCancel}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(index)}>
                      <FaPencilAlt />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" onClick={() => onSave(editedData)}>
          Save Mapping
        </Button>
        <Button variant="success" onClick={() => onSubmit()} disabled={progress.etlCompleted} className="ms-2">
          Submit Mapping
        </Button>
      </div>
    </>
  );
};

export default MappingTable;
