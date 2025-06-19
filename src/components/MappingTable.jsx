// src/components/MappingTable.jsx
import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaPencilAlt, FaTimes, FaCheck } from "react-icons/fa";

const MappingTable = ({ data, onSave }) => {
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
      <div style={{ maxHeight: "500px", overflowY: editedData.length > 10 ? "auto" : "visible" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Source Schema</th>
              <th>Destination Schema</th>
              <th>Transformation Rule</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((row, index) => (
              <tr key={index}>
                <td>{row.sourceField}</td>
                <td>
                  {editingRow === index ? (
                    <Form.Control value={row.targetField} onChange={(e) => handleChange(index, "targetField", e.target.value)} />
                  ) : (
                    row.targetField
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
                          // e.target.value.split(";").map((r) => r.trim())
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

      <div className="justify-content-center mt-3">
        <Button variant="primary" onClick={() => onSave(editedData)}>
          Save Mapping
        </Button>
      </div>
    </>
  );
};

export default MappingTable;
